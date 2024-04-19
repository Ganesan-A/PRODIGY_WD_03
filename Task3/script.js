// Game variables
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Function to check for a winner
function checkWinner() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      gameActive = false;
      return gameBoard[a];
    }
  }
  return null;
}

// Function to handle cell click
function handleCellClick(cell, index) {
  if (gameActive && !cell.textContent) {
    cell.textContent = currentPlayer;
    gameBoard[index] = currentPlayer;
    const winner = checkWinner();
    if (winner) {
      statusDisplay.textContent = `Player ${winner} wins!`;
      gameActive = false;
    } else if (!gameBoard.includes('')) {
      statusDisplay.textContent = "It's a draw!";
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusDisplay.textContent = `Current Player: ${currentPlayer}`;
    }
  }
}

// Function to reset the game
function resetGame() {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusDisplay.textContent = `Current Player: ${currentPlayer}`;
  cells.forEach(cell => cell.textContent = '');
}

// Event listeners
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleCellClick(cell, index));
});

resetButton.addEventListener('click', resetGame);
