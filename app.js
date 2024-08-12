const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
let isRecognizing = false; // Track the state of recognition

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Make sure this function is only called after user interaction
function initializeJarvis() {
    speak("Initializing JARVIS....");
    wishMe();
}

function wishMe() {
    const day = new Date();
    const hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Good Morning Yuvraj Sir! How are you.");
    } else if (hour >= 12 && hour < 17) {
        speak("Good Afternoon Yuvraj Sir! What about your task? How can I help you?");
    } else {
        speak("Good Evening Yuvraj Sir!");
    }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = () => {
    isRecognizing = true; // Set recognizing state to true when recognition starts
};

recognition.onend = () => {
    isRecognizing = false; // Reset recognizing state when recognition ends
};

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    if (!isRecognizing) { // Check if recognition is not already running
        content.textContent = "Listening...";
        recognition.start();
    }
});

btn.addEventListener('click', initializeJarvis);

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, how may I help you?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");

    }
    else if (message.includes("open Leetcode")) {
        window.open("https://leetcode.com", "_blank");
        speak("Opening Leetcode...");
     }
    else if (message.includes("open chatgpt")) {
        window.open("https://chatgpt.com/", "_blank");
        speak("Opening Chat-GPT...");
     }
    else if (message.includes("open Striver SDE Sheet")) {
        window.open("https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/", "_blank");
        speak("Opening Striver SDE Sheet by Raj Vikrmaditya Sir...");
     }
    else if (message.includes("open MyResume")) {
        window.open("https://drive.google.com/file/d/1roCJbkGQYrYf37F7YfS9mXF4HwIpQFlW/view?usp=sharing", "_blank");
        speak("Opening Yuvraj Singh Resume...");
     }
      else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        const query = encodeURIComponent(message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        const query = encodeURIComponent(message.replace("wikipedia", "").trim());
        window.open(`https://en.wikipedia.org/wiki/${query}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else {
        const query = encodeURIComponent(message);
        window.open(`https://www.google.com/search?q=${query}`, "_blank");
        const finalText = "I found some information for " + message + " on Google.";
        speak(finalText);
    }
}
