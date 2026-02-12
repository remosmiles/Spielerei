let shakeTriggered = false;
let result = 0;

// Schritt 1: Das Erdbeben nach Button-Klick
function triggerShake() {
    const input = document.getElementById('entry-input').value;
    if (input.trim() === "") {
        alert("Du musst schon etwas antworten...");
        return;
    }

    if (shakeTriggered) return;
    shakeTriggered = true;
    
    // Beben starten
    document.getElementById('main-body').classList.add('shake-active');
    
    // Nach 5 Sekunden Beben stoppen und zum Quiz wechseln
    setTimeout(() => {
        document.getElementById('main-body').classList.remove('shake-active');
        document.getElementById('step1').classList.add('hidden-step');
        document.getElementById('step2').classList.remove('hidden-step');
    }, 5000);
}

// Schritt 2: Quiz prüfen (Der Remo-Check)
function checkQuiz() {
    const answer = document.getElementById('quiz-input').value.trim();
    
    if (answer.toLowerCase() === 'remo') {
        proceedToMath();
    } else {
        // Roter Balken einblenden
        const banner = document.getElementById('error-banner');
        banner.classList.remove('hidden-step');
        
        // Nach 3 Sekunden Balken weg und trotzdem zur Mathe-Aufgabe (als Strafe)
        setTimeout(() => {
            banner.classList.add('hidden-step');
            proceedToMath();
        }, 3000);
    }
}

// Schritt 3: Die Mathe-Challenge
function proceedToMath() {
    document.getElementById('step2').classList.add('hidden-step');
    document.getElementById('step3').classList.remove('hidden-step');
    
    const n1 = Math.floor(Math.random() * 50) + 10;
    const n2 = Math.floor(Math.random() * 50) + 10;
    result = n1 + n2;
    document.getElementById('math-problem').innerText = `${n1} + ${n2}`;
    
    let timeLeft = 15;
    const bar = document.getElementById('timer-bar');
    
    const timer = setInterval(() => {
        timeLeft -= 0.1;
        bar.style.width = (timeLeft / 15 * 100) + "%";
        
        // Sofortprüfung beim Tippen
        const userVal = parseInt(document.getElementById('math-input').value);
        if (userVal === result) {
            clearInterval(timer);
            win();
        }

        if (timeLeft <= 0) {
            clearInterval(timer);
            if (parseInt(document.getElementById('math-input').value) !== result) {
                // Gnadenlose Weiterleitung
                window.location.href = "https://www.bullenpower-uri.ch";
            }
        }
    }, 100);
}

function win() {
    const s3 = document.getElementById('step3');
    s3.innerHTML = "<div class='text-8xl mb-4'>😉</div><h2 class='text-2xl font-bold'>System stabilisiert!</h2>";
    setTimeout(() => {
        alert("Glück gehabt. Der PC bleibt an.");
        location.reload(); 
    }, 2500);
}
