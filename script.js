class TextToSpeechApp {
    constructor() {
        this.speechSynthesis = window.speechSynthesis;
        this.voiceSelect = document.getElementById('voiceSelect');
        this.textInput = document.getElementById('textInput');
        this.speakButton = document.getElementById('speakButton');
        this.pauseButton = document.getElementById('pauseButton');
        this.resumeButton = document.getElementById('resumeButton');
        this.stopButton = document.getElementById('stopButton');
        this.volumeControl = document.getElementById('volumeControl');
        this.volumeValue = document.getElementById('volumeValue');
        this.rateControl = document.getElementById('rateControl');
        this.rateValue = document.getElementById('rateValue');
        this.pitchControl = document.getElementById('pitchControl');
        this.pitchValue = document.getElementById('pitchValue');

        this.currentUtterance = null;
        this.voices = [];

        this.initializeVoices();
        this.addEventListeners();
    }

    initializeVoices() {
        const updateVoices = () => {
            this.voices = this.speechSynthesis.getVoices();
            this.voiceSelect.innerHTML = '';
            this.voices.forEach((voice, index) => {
                const option = document.createElement('option');
                option.textContent = `${voice.name} (${voice.lang})`;
                option.setAttribute('data-lang', voice.lang);
                option.setAttribute('data-name', voice.name);
                this.voiceSelect.appendChild(option);
            });
        };

        updateVoices();
        this.speechSynthesis.onvoiceschanged = updateVoices;
    }

    addEventListeners() {
        this.speakButton.addEventListener('click', () => this.speak());
        this.pauseButton.addEventListener('click', () => this.speechSynthesis.pause());
        this.resumeButton.addEventListener('click', () => this.speechSynthesis.resume());
        this.stopButton.addEventListener('click', () => this.speechSynthesis.cancel());

        this.volumeControl.addEventListener('input', (e) => {
            const volume = e.target.value;
            this.volumeValue.textContent = `${Math.round(volume * 100)}%`;
        });

        this.rateControl.addEventListener('input', (e) => {
            const rate = e.target.value;
            this.rateValue.textContent = `${rate}x`;
        });

        this.pitchControl.addEventListener('input', (e) => {
            const pitch = e.target.value;
            this.pitchValue.textContent = `${pitch}x`;
        });
    }

    speak() {
        this.speechSynthesis.cancel();

        const text = this.textInput.value.trim();
        if (!text) {
            alert('Please enter some text to speak.');
            return;
        }

        const utterance = new SpeechSynthesisUtterance(text);

        const selectedVoice = this.voiceSelect.selectedOptions[0];
        if (selectedVoice) {
            const voice = this.voices.find(v => v.name === selectedVoice.getAttribute('data-name'));
            if (voice) utterance.voice = voice;
        }

        utterance.volume = parseFloat(this.volumeControl.value);
        utterance.rate = parseFloat(this.rateControl.value);
        utterance.pitch = parseFloat(this.pitchControl.value);

        this.speechSynthesis.speak(utterance);
    }
}

const textToSpeechApp = new TextToSpeechApp();