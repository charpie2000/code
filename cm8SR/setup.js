var arr = [];       // Array for the CPU's code. Global variable because it will never be edited and is required for a lot of functions.
var guesses = 0;    // How many times the player has guessed. Global because it has to be available every time the button is pressed.

// Function to generate a random color (0-7) for the CPU's code
function getRandomColor() {
    return Math.floor(Math.random() * 7);
}

// Selects random numbers (0-7) for the computer's code. Ensures colors are not repeated.
for (i = 0; i < 4; i++) {
    var test;
    do {
        test = getRandomColor();
    } while (arr.includes(test)); // Keep generating new numbers until a unique one is found

    arr[i] = test; // Puts the unique random number into the array.
}
