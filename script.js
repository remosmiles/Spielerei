let shakeTriggered = false;
let result = 0;

// Sound-Effekt (Ein kurzer Piepton / Alarm)
const errorSound = new Audio('https://actions.google.com/sounds/v1/emergency/emergency_siren_short.ogg');

function triggerShake() {
    const input = document.getElementById('entry-input').value;
    if (input.trim() === "") return;
    if (shakeTriggered) return;
    shakeTriggered = true;
    
    document.getElementById('main-body').classList.add('shake-active');
    
    setTimeout(() => {
        document.getElementById('main-body').classList.remove('shake-active');
        document.getElementById('step1').classList.add('hidden-step');
        document.getElementById('step2').classList.remove('hidden-step');
    }, 5000);
}

function checkQuiz() {
    const answer = document.getElementById('quiz-input').value.trim();
    if (answer.toLowerCase() === 'remo') {
        proceedToMath();
    } else {
        showChaos(); // Chaos-Funktion bei falscher Antwort
    }
}

function showChaos() {
    errorSound.play();
    const banner = document.getElementById('error-banner');
    banner.classList.remove('hidden-step');
    banner.classList.add('error-overlay');

    // Erstelle 15 kleine Error-Fenster an zufälligen Positionen
    for (let i = 0; i < 15; i++) {
        createPopup();
    }

    // Nach 4 Sekunden alles aufräumen und zur Mathe-Aufgabe
    setTimeout(() => {
        banner.classList.add('hidden-step');
        banner.classList.remove('error-overlay');
        const popups = document.querySelectorAll('.fake-popup');
        popups.forEach(p => p.remove());
        proceedToMath();
    }, 4000);
}

function createPopup() {
    const popup = document.createElement('div');
    popup.className = 'fake-popup';
    popup.innerHTML = `<div class="popup-header">System Error</div><p style="font-size: 10px">CRITICAL_FAILURE_0x0${Math.floor(Math.random()*999)}</p>`;
    
    // Zufällige Position auf dem Bildschirm
    popup.style.top = Math.random() * 80 + "%";
    popup.style.left = Math.random() * 80 + "%";
    
    document.body.appendChild(popup);
}

function proceedToMath() {
    document.getElementById('step2').classList.add('hidden-step');
    document.getElementById('step3').classList.remove('hidden-step');
    
    const n1 = Math.floor(Math.random() * 50) + 10;
    const n2 = Math.floor(Math.random() * 50) + 10;
    result = n1 + n2;
    document.getElementById('math-problem').innerText = `${n1} + ${n2}`;
    
    let timeLeft = 7; // AUF 7 SEKUNDEN GEÄNDERT
    const bar = document.getElementById('timer-bar');
    const timeText = document.getElementById('time-text');
    
    const timer = setInterval(() => {
        timeLeft -= 0.05;
        bar.style.width = (timeLeft / 7 * 100) + "%";
        timeText.innerText = Math.ceil(timeLeft);
        
        const userVal = parseInt(document.getElementById('math-input').value);
        if (userVal === result) {
            clearInterval(timer);
            win();
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (parseInt(document.getElementById('math-input').value) !== result) {
                window.location.href = "https://www.bullenpower-uri.ch";
            }
        }
    }, 50);
}

function win() {
    const s3 = document.getElementById('step3');
    s3.innerHTML = "<div class='text-8xl mb-4'>😉</div><h2 class='text-2xl font-bold'>System stabilisiert!</h2>";
    setTimeout(() => { alert("Glück gehabt."); location.reload(); }, 2000);
}
