window.addEventListener("DOMContentLoaded", () => {
  const speech = new SpeechSynthesisUtterance();
  let voices = [];

  const voiceSelect = document.querySelector("select");
  const speakBtn = document.getElementById("speakBtn");
  const pauseBtn = document.getElementById("pauseBtn");
  const resumeBtn = document.getElementById("resumeBtn");
  const textArea = document.querySelector("textarea");

  function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; 

    voices.forEach((voice, i) => {
      const option = new Option(`${voice.name} (${voice.lang})`, i);
      voiceSelect.add(option);
    });

    if (voices.length > 0) {
      speech.voice = voices[0];
    }
  }

  window.speechSynthesis.onvoiceschanged = populateVoices;
  populateVoices();

  voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
  });


  speakBtn.addEventListener("click", () => {
    const text = textArea.value.trim();
    if (!text) {
      alert("Please enter some text!");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel(); // 
    }

    speech.text = text;
    window.speechSynthesis.speak(speech);
  });


  pauseBtn.addEventListener("click", () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  });

  resumeBtn.addEventListener("click", () => {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  });
});
