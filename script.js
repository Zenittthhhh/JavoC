// script.js
// Variables globales
let leones = 0;
let autoClickerCount = 0;
let doubleClickCount = 0;
let megaClickCount = 0;
let superClickCount = 0;
let ultraClickCount = 0;

// Elementos del DOM
const leonesCountElement = document.getElementById('leones-count');
const leonesElement = document.getElementById('leones');
const autoClickerButton = document.getElementById('auto-clicker');
const doubleClickButton = document.getElementById('double-click');
const megaClickButton = document.getElementById('mega-click');
const superClickButton = document.getElementById('super-click');
const ultraClickButton = document.getElementById('ultra-click');

// Precios iniciales de las mejoras
const initialCosts = {
    autoClicker: 10,
    doubleClick: 50,
    megaClick: 100,
    superClick: 200,
    ultraClick: 400
};

// Cantidad de leones que genera cada mejora
const clickMultipliers = {
    doubleClick: 2,
    megaClick: 5,
    superClick: 10,
    ultraClick: 20
};

// Función para calcular el costo progresivo de cada mejora
const getProgressiveCost = (baseCost, count) => {
    return Math.round(baseCost * Math.pow(1.15, count));
};

// Cambiar el fondo y las imágenes de los botones desde el HTML
const body = document.body;
const backgroundImageUrl = body.getAttribute('data-background');
body.style.backgroundImage = `url('${backgroundImageUrl}')`;

const updateButtonImage = (button, imageUrl) => {
    button.style.backgroundImage = `url('${imageUrl}')`;
    button.style.backgroundSize = 'cover';
    button.style.backgroundPosition = 'center';
};

updateButtonImage(autoClickerButton, autoClickerButton.getAttribute('data-background'));
updateButtonImage(doubleClickButton, doubleClickButton.getAttribute('data-background'));
updateButtonImage(megaClickButton, megaClickButton.getAttribute('data-background'));
updateButtonImage(superClickButton, superClickButton.getAttribute('data-background'));
updateButtonImage(ultraClickButton, ultraClickButton.getAttribute('data-background'));

// Función para guardar el progreso en localStorage
function saveProgress() {
    localStorage.setItem('leones', leones);
    localStorage.setItem('autoClickerCount', autoClickerCount);
    localStorage.setItem('doubleClickCount', doubleClickCount);
    localStorage.setItem('megaClickCount', megaClickCount);
    localStorage.setItem('superClickCount', superClickCount);
    localStorage.setItem('ultraClickCount', ultraClickCount);
}

// Función para cargar el progreso desde localStorage
function loadProgress() {
    leones = parseInt(localStorage.getItem('leones'), 10) || 0;
    autoClickerCount = parseInt(localStorage.getItem('autoClickerCount'), 10) || 0;
    doubleClickCount = parseInt(localStorage.getItem('doubleClickCount'), 10) || 0;
    megaClickCount = parseInt(localStorage.getItem('megaClickCount'), 10) || 0;
    superClickCount = parseInt(localStorage.getItem('superClickCount'), 10) || 0;
    ultraClickCount = parseInt(localStorage.getItem('ultraClickCount'), 10) || 0;
}

// Función para actualizar el contador de leones en pantalla
function updateDisplay() {
    leonesCountElement.textContent = `${leones} leones`;
    
    // Actualizar el texto de los botones con el nuevo costo
    autoClickerButton.textContent = `Auto Clicker (${getProgressiveCost(initialCosts.autoClicker, autoClickerCount)} leones)`;
    doubleClickButton.textContent = `Doble Click (${getProgressiveCost(initialCosts.doubleClick, doubleClickCount)} leones)`;
    megaClickButton.textContent = `Mega Click (${getProgressiveCost(initialCosts.megaClick, megaClickCount)} leones)`;
    superClickButton.textContent = `Super Click (${getProgressiveCost(initialCosts.superClick, superClickCount)} leones)`;
    ultraClickButton.textContent = `Ultra Click (${getProgressiveCost(initialCosts.ultraClick, ultraClickCount)} leones)`;

    // Habilitar o deshabilitar botones dependiendo del número de leones
    autoClickerButton.disabled = leones < getProgressiveCost(initialCosts.autoClicker, autoClickerCount);
    doubleClickButton.disabled = leones < getProgressiveCost(initialCosts.doubleClick, doubleClickCount);
    megaClickButton.disabled = leones < getProgressiveCost(initialCosts.megaClick, megaClickCount);
    superClickButton.disabled = leones < getProgressiveCost(initialCosts.superClick, superClickCount);
    ultraClickButton.disabled = leones < getProgressiveCost(initialCosts.ultraClick, ultraClickCount);
}

// Cargar el progreso al inicio
loadProgress();
updateDisplay();

// Click del usuario en la imagen
leonesElement.addEventListener('click', () => {
    // Calculamos el total de leones a añadir con los multiplicadores
    const baseLeones = 1;
    const totalLeonesToAdd = baseLeones * (
        1 + 
        (doubleClickCount * clickMultipliers.doubleClick) + 
        (megaClickCount * clickMultipliers.megaClick) + 
        (superClickCount * clickMultipliers.superClick) + 
        (ultraClickCount * clickMultipliers.ultraClick)
    );
    leones += totalLeonesToAdd;
    updateDisplay();
    saveProgress();
});

// Auto Clicker
let autoClickerInterval = null;

const startAutoClicker = () => {
    if (autoClickerInterval) return; // No inicia otro intervalo si ya hay uno activo
    autoClickerInterval = setInterval(() => {
        const leonesPerInterval = autoClickerCount; // Cada autoclicker añade 1 león por intervalo
        leones += leonesPerInterval;
        updateDisplay();
        saveProgress();
    }, 1000); // Intervalo de 1 segundo
};

// Parar Auto Clicker
const stopAutoClicker = () => {
    clearInterval(autoClickerInterval);
    autoClickerInterval = null;
};

// Eventos de botones de mejoras
autoClickerButton.addEventListener('click', () => {
    const cost = getProgressiveCost(initialCosts.autoClicker, autoClickerCount);
    if (leones >= cost) {
        leones -= cost;
        autoClickerCount++;
        updateDisplay();
        saveProgress();
        startAutoClicker();
    }
});

doubleClickButton.addEventListener('click', () => {
    const cost = getProgressiveCost(initialCosts.doubleClick, doubleClickCount);
    if (leones >= cost) {
        leones -= cost;
        doubleClickCount++;
        updateDisplay();
        saveProgress();
    }
});

megaClickButton.addEventListener('click', () => {
    const cost = getProgressiveCost(initialCosts.megaClick, megaClickCount);
    if (leones >= cost) {
        leones -= cost;
        megaClickCount++;
        updateDisplay();
        saveProgress();
    }
});

superClickButton.addEventListener('click', () => {
    const cost = getProgressiveCost(initialCosts.superClick, superClickCount);
    if (leones >= cost) {
        leones -= cost;
        superClickCount++;
        updateDisplay();
        saveProgress();
    }
});

ultraClickButton.addEventListener('click', () => {
    const cost = getProgressiveCost(initialCosts.ultraClick, ultraClickCount);
    if (leones >= cost) {
        leones -= cost;
        ultraClickCount++;
        updateDisplay();
        saveProgress();
    }
});
