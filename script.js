const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const voiceBtn = document.getElementById("voiceBtn");
const typing = document.getElementById("typing");

function addMessage(text, sender) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.innerHTML = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function saveHistory() {
  localStorage.setItem("nexora-history", chatBox.innerHTML);
}

function loadHistory() {
  const history = localStorage.getItem("nexora-history");
  if (history) {
    chatBox.innerHTML = history;
  }
}

loadHistory();

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

function sendMessage() {
  const text = userInput.value.trim();

  if (!text) return;

  addMessage(text, "user");

  saveHistory();

  userInput.value = "";

  typing.style.display = "block";

  setTimeout(() => {
    typing.style.display = "none";
    addMessage("⚠️ AI Backend এখনও যুক্ত করা হয়নি।", "ai");
    saveHistory();
  }, 1200);
}// ===== Voice Input =====

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {

  const recognition = new SpeechRecognition();

  recognition.lang = "bn-BD";

  recognition.continuous = false;

  recognition.interimResults = false;

  voiceBtn.addEventListener("click", () => {

    recognition.start();

    voiceBtn.innerHTML = "🎙️";

  });

  recognition.onresult = (event) => {

    const transcript = event.results[0][0].transcript;

    userInput.value = transcript;

    voiceBtn.innerHTML = "🎤";

  };

  recognition.onerror = () => {

    voiceBtn.innerHTML = "🎤";

    alert("Voice recognition failed.");

  };

  recognition.onend = () => {

    voiceBtn.innerHTML = "🎤";

  };

} else {

  voiceBtn.style.display = "none";

}