// --- Contador ajustado a exactamente 2 meses (60 días) atrás ---
const startDate = new Date(new Date().getTime() - (60 * 24 * 60 * 60 * 1000));

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const counterElement = document.getElementById('counter');
    if (counterElement) {
        counterElement.innerText = `${days}d : ${String(hours).padStart(2, '0')}h : ${String(minutes).padStart(2, '0')}m : ${String(seconds).padStart(2, '0')}s`;
    }
}

setInterval(updateCounter, 1000);
updateCounter();

// --- Generador de corazones flotantes ---
const heartsContainer = document.getElementById('heartsContainer');

function createFloatingHeart() {
    if (!heartsContainer) return;
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 14 + 10) + 'px';
    
    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 7000);
}

setInterval(createFloatingHeart, 400);

// --- Interactividad de los botones finales ---
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (yesBtn) {
    yesBtn.addEventListener('click', () => {
        successModal.classList.remove('hidden');
        createConfettiHearts();
    });
}

if (noBtn) {
    noBtn.addEventListener('mouseover', () => {
        const x = Math.random() * 160 - 80;
        const y = Math.random() * 80 - 40;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });

    noBtn.addEventListener('click', () => {
        alert("Opción invalida, tu corazón dice que si");
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        successModal.classList.add('hidden');
    });
}

function createConfettiHearts() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '💖';
            heart.style.left = '50vw';
            heart.style.top = '50vh';
            heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const targetX = Math.cos(angle) * distance;
            const targetY = Math.sin(angle) * distance;

            heart.style.transition = 'all 1s ease-out';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.style.transform = `translate(${targetX}px, ${targetY}px) scale(1.5)`;
                heart.style.opacity = '0';
            }, 50);

            setTimeout(() => {
                heart.remove();
            }, 1050);
        }, i * 30);
    }
}