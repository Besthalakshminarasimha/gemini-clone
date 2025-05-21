// Chat message sending
function sendMessage() {
    const input = document.getElementById("userInput");
    const chat = document.getElementById("chat");
    const message = input.value.trim();
    if (message) {
      const msgDiv = document.createElement("div");
      msgDiv.className = "chat-message user fade-in";
      msgDiv.textContent = message;
      chat.appendChild(msgDiv);
      input.value = "";
      chat.scrollTop = chat.scrollHeight;
    }
  }
  
  // Theme toggle
  function toggleTheme() {
    const root = document.documentElement;
    const currentBg = getComputedStyle(root).getPropertyValue('--bg').trim();
    if (currentBg === '#ffffff') {
      root.style.setProperty('--bg', '#1e1f24');
      root.style.setProperty('--text', '#e4e6eb');
      root.style.setProperty('--input', '#2a2b30');
      root.style.setProperty('--card', '#2c2d33');
      root.style.setProperty('--border', '#3a3b3c');
      root.style.setProperty('--highlight', '#9aa0a6');
    } else {
      root.style.setProperty('--bg', '#ffffff');
      root.style.setProperty('--text', '#000000');
      root.style.setProperty('--input', '#f0f0f0');
      root.style.setProperty('--card', '#e0e0e0');
      root.style.setProperty('--border', '#ccc');
      root.style.setProperty('--highlight', '#555');
    }
  }
  
  // Model selector
  function updateModel() {
    const model = document.getElementById("modelSelect").value;
    alert(`Model changed to ${model}`);
  }
  
  // Dropdown toggle
  function toggleDropdown() {
    const dropdown = document.getElementById("menuDropdown");
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
  }
  
  window.addEventListener("click", function(e) {
    const dropdown = document.getElementById("menuDropdown");
    if (!e.target.matches("button[title='Menu']")) {
      dropdown.style.display = "none";
    }
  });
  
  // Voice recognition logic
  let recognition;
  let isListening = false;
  const micBtn = document.getElementById('micBtn');
  const userInput = document.getElementById('userInput');
  
  function toggleMic() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Your browser does not support Speech Recognition.');
      return;
    }
  
    if (isListening) {
      recognition.stop();
      return;
    }
  
    startRecognition();
  }
  
  function startRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = false;
  
    recognition.start();
    isListening = true;
    micBtn.classList.add('listening');
    micBtn.title = "Stop Listening";
  
    recognition.onresult = (event) => {
      let transcript = '';
      for(let i = event.resultIndex; i < event.results.length; ++i) {
        transcript += event.results[i][0].transcript;
      }
      userInput.value = transcript;
    };
  
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      stopRecognition();
    };
  
    recognition.onend = () => {
      stopRecognition();
    };
  }
  
  function stopRecognition() {
    isListening = false;
    micBtn.classList.remove('listening');
    micBtn.title = "Mic";
  }
  
