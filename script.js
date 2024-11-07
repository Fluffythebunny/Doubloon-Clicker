let doubloons = 0;
let autoClickers = 0;
let multiplier = 1;
let ships = 0;
let cannonballs = 0;
let parrotCount = 0;
let compassCount = 0;
let krakenCount = 0;
let blahajCount = 0;
let dps = 0;

const doubloon = document.getElementById('doubloon');
const counter = document.getElementById('counter');

function createSparkles() {
    const sparkleCount = 5;
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = `${Math.random() * 100}%`;
        sparkle.style.top = `${Math.random() * 100}%`;
        sparkle.style.animationDelay = `${Math.random() * 0.8}s`;
        doubloon.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }
}

doubloon.addEventListener('click', (event) => {
    addDoubloons(1 * multiplier);
    createFloatingText(event);
    createParticles(event);
    playGoldSound();
    createSparkles();
});

function playGoldSound() {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/coins-in-hand-1.mp3');
    audio.volume = 0.2;
    audio.play();
}

function addDoubloons(amount) {
    doubloons += amount;
    updateStats();
    doubloon.style.transform = 'scale(0.95)';
    setTimeout(() => doubloon.style.transform = 'scale(1)', 100);
}

function createFloatingText(event) {
    const text = document.createElement('div');
    text.textContent = `+${1 * multiplier} doubloons!`;
    text.className = 'floating-text';
    text.style.left = `${event.clientX}px`;
    text.style.top = `${event.clientY}px`;
    document.body.appendChild(text);
    setTimeout(() => text.remove(), 1000);
}

function createParticles(event) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'particles';
        particle.style.left = `${event.clientX}px`;
        particle.style.top = `${event.clientY}px`;
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        
        const angle = (Math.random() * Math.PI * 2);
        const velocity = 8 + Math.random() * 8;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        document.body.appendChild(particle);
        
        let posX = event.clientX;
        let posY = event.clientY;
        let opacity = 1;
        
        function animate() {
            posX += vx;
            posY += vy;
            opacity -= 0.02;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

function buyAutoClicker() {
    if (doubloons >= 50) {
        doubloons -= 50;
        autoClickers++;
        updateStats();
        createSparkles();
    }
}

function buyMultiplier() {
    if (doubloons >= 100) {
        doubloons -= 100;
        multiplier *= 1.5;
        updateStats();
        createSparkles();
    }
}

function buyShip() {
    if (doubloons >= 500) {
        doubloons -= 500;
        ships++;
        updateStats();
        createSparkles();
    }
}

function buyCannonball() {
    if (doubloons >= 1000) {
        doubloons -= 1000;
        cannonballs++;
        updateStats();
        createSparkles();
    }
}

function buyParrot() {
    if (doubloons >= 2000) {
        doubloons -= 2000;
        parrotCount++;
        dps += 15;
        updateDisplay();
        updateStats();
        updateUpgradeCounts();
        createSparkles();
    }
}

function buyCompass() {
    if (doubloons >= 5000) {
        doubloons -= 5000;
        compassCount++;
        clickPower += 25;
        dps += 30;
        updateDisplay();
        updateStats();
        updateUpgradeCounts();
        createSparkles();
    }
}

function buyKraken() {
    if (doubloons >= 10000) {
        doubloons -= 10000;
        krakenCount++;
        dps += 75;
        clickPower += 50;
        updateDisplay();
        updateStats();
        updateUpgradeCounts();
        createSparkles();
    }
}

function buyBlahaj() {
    if (doubloons >= 25000) {
        doubloons -= 25000;
        blahajCountCount++;
        dps += 150;
        clickPower += 100;
        updateDisplay();
        updateStats();
        updateUpgradeCounts();
        createSparkles();
    }
}

function calculateDPS() {
    return (autoClickers + (ships * 5) + (cannonballs * 10)) * multiplier;
}

function updateStats() {
    counter.textContent = `Doubloons: ${Math.floor(doubloons)}`;
    document.getElementById('dps').textContent = `Per Second: ${calculateDPS()}`;
    document.getElementById('click-power').textContent = `Click Power: ${multiplier.toFixed(1)}`;
    
    document.querySelectorAll('.upgrade-btn').forEach((btn, index) => {
        const counts = [autoClickers, Math.floor(multiplier - 1), ships, cannonballs];
        const count = btn.querySelector('.count');
        if (counts[index] > 0) {
            count.textContent = counts[index];
            count.style.display = 'flex';
        } else {
            count.style.display = 'none';
        }
    });
}

setInterval(() => {
    if (autoClickers > 0 || ships > 0 || cannonballs > 0) {
        addDoubloons(calculateDPS());
    }
}, 1000);

// didnt have an image for seagulls
document.querySelectorAll('.seagull').forEach(seagull => {
    seagull.style.top = `${Math.random() * 50}vh`;
    seagull.style.animationDelay = `${Math.random() * 5}s`;
});
