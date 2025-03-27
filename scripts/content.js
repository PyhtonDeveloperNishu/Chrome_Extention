let body = document.querySelector("body");

let btnBQ = document.createElement("button");
btnBQ.setAttribute("id","btnBQ");

btnBQ.addEventListener("click",doSomething);

body.appendChild(btnBQ)

let speechRecognition = new webkitSpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = true;  // Corrected property
speechRecognition.lang="en-in";

let transcript = "";

// Handle speech recognition results
speechRecognition.onresult = function (event) {
    transcript = ""; 
    for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    console.log("Transcript:", transcript);  // Log transcript for debugging
};

document.addEventListener('keypress',handleKbd);
function handleKbd(event){
    if(event.shiftKey && event.altKey && event.code === 'KeyQ'){
        btnBQ.click();
    }
}
// Handle errors
speechRecognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
    alert("An error occurred: " + event.error);
};

// Button click handler
function doSomething() {
    if (!btnBQ.hasAttribute("listening")) {
        btnBQ.setAttribute("listening", "true");
        btnBQ.textContent = "Stop";
        speechRecognition.start();
    } else {
        btnBQ.removeAttribute("listening");
        btnBQ.textContent = "Start";
        console.log("I am not listening anymore");
        speechRecognition.stop();

        // Display popup after stopping recognition
        setTimeout(() => {
            const myPopup = new Popup({
                id: "my-popup",
                title: "Here is what you said:",
                content: transcript || "No speech detected!"
            });
            myPopup.show();
        }, 2000);  // Add delay to ensure transcript is fully captured
    }
}

// Attach event listener
btnBQ.addEventListener("click", doSomething);
        