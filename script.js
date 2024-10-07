let [hours, minutes, seconds] = [0, 0, 0];
let timer = null;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('laps');

// Update the display
function updateDisplay() {
    const hoursStr = String(hours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');
    display.textContent = `${hoursStr}:${minutesStr}:${secondsStr}`;
}

// Start or pause the stopwatch
startPauseBtn.addEventListener('click', function () {
    if (!isRunning) {
        timer = setInterval(incrementTime, 1000);
        startPauseBtn.textContent = 'Pause';
        isRunning = true;
    } else {
        clearInterval(timer);
        startPauseBtn.textContent = 'Start';
        isRunning = false;
    }
});

// Increment time and update display
function incrementTime() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    updateDisplay();
}

// Reset the stopwatch
resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    [hours, minutes, seconds] = [0, 0, 0];
    updateDisplay();
    startPauseBtn.textContent = 'Start';
    isRunning = false;
    laps = [];
    lapsContainer.innerHTML = '';
});

// Record a lap
lapBtn.addEventListener('click', function () {
    if (isRunning) {
        const lapTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        laps.push(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapItem);
    }
});
