// Game state variables
let targetNumber;
let attempts;
const maxAttempts = 10; // Maximum number of allowed retries

// Game statistics objects
const playerStats = {
    wins: 0,
    losses: 0,
    currentStreak: 0
};

const gameStats = {
    totalGames: 0,
    highestStreak: 0
};

// DOM elements
const guessInput = document.getElementById('guessInput');
const submitGuessBtn = document.getElementById('submitGuess');
const quitGameBtn = document.getElementById('quitGame');
const messageDisplay = document.getElementById('message');
const attemptsLeftDisplay = document.getElementById('attemptsLeft');
const winsDisplay = document.getElementById('wins');
const lossesDisplay = document.getElementById('losses');
const currentStreakDisplay = document.getElementById('currentStreak');
const totalGamesDisplay = document.getElementById('totalGames');
const highestStreakDisplay = document.getElementById('highestStreak');

// Function to start a new game
function newGame() {
    targetNumber = Math.floor(Math.random() * 1001); // Random number between 0 and 1000
    attempts = 0;
    messageDisplay.textContent = '';
    attemptsLeftDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;
    guessInput.value = '';
    guessInput.disabled = false;
    submitGuessBtn.disabled = false;
    updateStatsDisplay();
    console.log("New game started. Target number (for debugging): " + targetNumber); // For debugging
}

// Function to update the statistics display
function updateStatsDisplay() {
    winsDisplay.textContent = playerStats.wins;
    lossesDisplay.textContent = playerStats.losses;
    currentStreakDisplay.textContent = playerStats.currentStreak;
    totalGamesDisplay.textContent = gameStats.totalGames;
    highestStreakDisplay.textContent = gameStats.highestStreak;
}

// Function to handle a player's guess
function handleGuess() {
    const playerGuess = parseInt(guessInput.value);

    if (isNaN(playerGuess) || playerGuess < 0 || playerGuess > 1000) {
        messageDisplay.textContent = "Please enter a valid number between 0 and 1000.";
        return;
    }

    attempts++;
    attemptsLeftDisplay.textContent = `Attempts left: ${maxAttempts - attempts}`;

    // Check if the guess is correct
    if (playerGuess === targetNumber) {
        messageDisplay.textContent = `Congratulations! You guessed the number ${targetNumber} in ${attempts} attempts.`;
        playerStats.wins++;
        playerStats.currentStreak++;
        gameStats.totalGames++;
        if (playerStats.currentStreak > gameStats.highestStreak) {
            gameStats.highestStreak = playerStats.currentStreak;
        }
        endGame(true);
    } else {
        let hint = '';

        // Hint for too high/too low
        if (playerGuess < targetNumber) {
            hint += 'Too low! ';
        } else {
            hint += 'Too high! ';
        }

        // Hint for odd/even
        if (targetNumber % 2 === 0) {
            hint += 'The number is even.';
        } else {
            hint += 'The number is odd.';
        }

        messageDisplay.textContent = `Incorrect! ${hint}`;

        // Check for loss due to max attempts
        if (attempts >= maxAttempts) {
            messageDisplay.textContent = `You ran out of attempts! The number was ${targetNumber}.`;
            playerStats.losses++;
            playerStats.currentStreak = 0;
            gameStats.totalGames++;
            endGame(false);
        }
    }
}

// Function to end the current game
function endGame(isWin) {
    guessInput.disabled = true;
    submitGuessBtn.disabled = true;
    updateStatsDisplay();
    // A slight delay before starting a new game or resetting, for better user experience
    setTimeout(() => {
        if (confirm("Play again?")) {
            newGame();
        }
    }, 1500); // 1.5 second delay
}

// Function to handle quitting the game
function quitGame() {
    const confirmQuit = confirm("Are you sure you want to quit? Your current game progress will be lost.");
    if (confirmQuit) {
        // Clear stats
        playerStats.wins = 0;
        playerStats.losses = 0;
        playerStats.currentStreak = 0;
        gameStats.totalGames = 0;
        gameStats.highestStreak = 0;
        updateStatsDisplay();

        // Redirect to AOIT Website (replace with actual AOIT URL)
        window.location.href = "https://www.aoiths.org/en/";
    }
}

// Event Listeners
submitGuessBtn.addEventListener('click', handleGuess);
quitGameBtn.addEventListener('click', quitGame);
guessInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !submitGuessBtn.disabled) {
        handleGuess();
    }
});

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', newGame);

