// --- MATRIX EFFEKT ---
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$+-*/=%";
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);

// --- LOGIK ---
let result = 0;
const errorSound = new Audio('https://actions.google.com/sounds/v1/emergency/emergency_siren_short.ogg');

function triggerShake() {
    const input = document.getElementById('entry-input').value;
    if (input.trim() === "") return;
    
    document.getElementById('main-body').classList.add('shake-active');
    
    setTimeout(() => {
        document.getElementById('main-body').classList.remove('shake-active');
        document.getElementById('step1').classList.add('hidden-step');
        document.getElementById('step2').classList.remove('hidden-step');
    }, 5000);
}

function checkQuiz() {
    const answer = document.getElementById('quiz-input').value.trim().toLowerCase();
    if (answer === 'remo') {
        proceedToMath();
    } else {
        showChaos();
    }
}

function showChaos() {
    errorSound.play().catch(() => {});
    const banner = document.getElementById('error-banner');
    banner.classList.remove('hidden-step');
    banner.classList.add('error-overlay');

    for (let i = 0; i < 20; i++) {
        const popup = document.createElement('div');
        popup.className = 'fake-popup';
        popup.innerHTML = `<div class="popup-header">SYSTEM ERROR</div><p class="p-2 text-[10px]">CRITICAL FAILURE!</p>`;
        popup.style.top = Math.random() * 80 + "%";
        popup.style.left = Math.random() * 80 + "%";
        document.body.appendChild(popup);
    }

    setTimeout(() => {
        banner.classList.add('hidden-step');
        document.querySelectorAll('.fake-popup').forEach(p => p.remove());
        proceedToMath();
    }, 4000);
}

function proceedToMath() {
    document.getElementById('step2').classList.add('hidden-step');
    document.getElementById('step3').classList.remove('hidden-step');
    
    const n1 = Math.floor(Math.random() * 50) + 10;
    const n2 = Math.floor(Math.random() * 50) + 10;
    result = n1 + n2;
    document.getElementById('math-problem').innerText = `${n1} + ${n2}`;
    
    let timeLeft = 7;
    const bar = document.getElementById('timer-bar');
    
    const timer = setInterval(() => {
        timeLeft -= 0.05;
        bar.style.width = (timeLeft / 7 * 100) + "%";
        
        if (parseInt(document.getElementById('math-input').value) === result) {
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
    document.getElementById('step3').innerHTML = "<div class='text-8xl mb-4 animate-bounce'>😉</div><h2 class='text-2xl font-bold'>ZUTRITT GEWÄHRT</h2>";
    setTimeout(() => { location.reload(); }, 3000);
}
