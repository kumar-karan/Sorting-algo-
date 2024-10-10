let array = [];
let isSorting = false;
let isReset = false;
let arraySize = document.getElementById('arraySize').value;
let speed = 1000 / document.getElementById('speed').value;
let sortingTimeouts = [];

// Helper to generate new array
function generateArray(size) {
    array = [];
    arrayContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 300) + 10);
        const bar = document.createElement('div');
        bar.style.height = `${array[i]}px`;
        bar.classList.add('bar');
        arrayContainer.appendChild(bar);
    }
}

// Helper function for sleep/delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Disable buttons while sorting
function disableButtons(isSorting) {
    document.getElementById('startButton').disabled = isSorting;
    document.getElementById('resetButton').disabled = !isSorting;
}

// Swap bars with animation
async function swapBars(bar1, bar2) {
    bar1.style.transform = `translateX(${bar2.offsetLeft - bar1.offsetLeft}px)`;
    bar2.style.transform = `translateX(${bar1.offsetLeft - bar2.offsetLeft}px)`;

    await sleep(speed);

    bar1.style.transform = '';
    bar2.style.transform = '';
}

// Bubble Sort with reset logic
async function bubbleSort() {
    isSorting = true;
    disableButtons(isSorting);
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (isReset) {
                return;
            }

            bars[j].classList.add('red');
            bars[j + 1].classList.add('red');

            await sleep(speed);

            if (array[j] > array[j + 1]) {
                await swapBars(bars[j], bars[j + 1]);

                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j]}px`;
                bars[j + 1].style.height = `${array[j + 1]}px`;
            }

            bars[j].classList.remove('red');
            bars[j + 1].classList.remove('red');
        }
    }
    isSorting = false;
    disableButtons(isSorting);
}

// Start sorting
document.getElementById('startButton').addEventListener('click', () => {
    isReset = false;
    let algorithm = document.getElementById('algorithms').value;
    if (algorithm === 'bubbleSort') bubbleSort();
    // You can add more sorting algorithms here
});

// Reset sorting process
document.getElementById('resetButton').addEventListener('click', () => {
    isReset = true;
    isSorting = false;
    sortingTimeouts.forEach(clearTimeout);  // Clear any running timeouts
    generateArray(arraySize);  // Reset the array
    disableButtons(isSorting);
});

// Update array and speed when sliders change
document.getElementById('arraySize').addEventListener('input', (e) => {
    arraySize = e.target.value;
    generateArray(arraySize);
});

document.getElementById('speed').addEventListener('input', (e) => {
    speed = 1000 / e.target.value;
});

// Generate initial array
generateArray(arraySize);
disableButtons(false);
