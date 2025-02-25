const textInput = document.getElementById('text-input');
const voiceSelect = document.getElementById('voice-select');
const rateInput = document.getElementById('rate');
const pitchInput = document.getElementById('pitch');
const speakButton = document.getElementById('speak');
const stopButton = document.getElementById('stop');

let synth = window.speechSynthesis;
let voices = [];

function populateVoiceList() {
    voices = synth.getVoices();
    voices.forEach((voice) => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

function speak() {
    if (textInput.value === '') {
        return; // Prevent speaking if no text is entered
    }

    const utterance = new SpeechSynthesisUtterance(textInput.value);
    const selectedVoice = voiceSelect.selectedOptions[0].value;
    utterance.voice = voices.find(voice => voice.name === selectedVoice);
    utterance.rate = rateInput.value;
    utterance.pitch = pitchInput.value;

    synth.speak(utterance);
}

function stop() {
    synth.cancel();
}

synth.onvoiceschanged = populateVoiceList;

speakButton.addEventListener('click', speak);
stopButton.addEventListener('click', stop);

rateInput.addEventListener('input', () => {
    if (synth.speaking) {
        stop();
        speak();
    }
});

pitchInput.addEventListener('input', () => {
    if (synth.speaking) {
        stop();
        speak();
    }
});
