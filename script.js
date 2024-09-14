// script.js
let gameActive = true;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];
let currentPlayer = 'X';

document.addEventListener('DOMContentLoaded', (event) => {
    const resetButton = document.getElementById('reset-button');

    resetButton.addEventListener('click', () => {
        resetGame();
    });

    createGrid();
    addHoverEffect();
});

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    gameActive = true;
    currentPlayer = 'X';
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x-cell', 'o-cell', 'winning-cell');
    });
    addHoverEffect();
}

function createGrid() {
    const playArea = document.getElementById('play-area');
    playArea.innerHTML = ''; // Clear any existing content

    for (let row = 0; row < 3; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            rowDiv.appendChild(cell);
        }
        playArea.appendChild(rowDiv);
    }
}

function handleCellClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    // Check if the cell is already filled
    if (cell.textContent !== '') {
        return;
    }

    // Update the cell with the current player's symbol
    cell.textContent = currentPlayer;

    // Add the class for 'X' or 'O' based on the current player
    if (currentPlayer === 'X') {
        cell.classList.add('x-cell');
    } else if (currentPlayer === 'O') {
        cell.classList.add('o-cell');
    }

    // Update the board state
    board[row][col] = currentPlayer;

    // Check for a win
    const winningCells = checkWin(row, col);
    if (winningCells) {
        alert(`${currentPlayer} wins!`);
        gameActive = false;
        highlightWinningCells(winningCells);
        removeHoverEffect();
        return;
    }

    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin(row, col) {
    // Check row
    if (board[row].every(cell => cell === currentPlayer)) {
        return [[row, 0], [row, 1], [row, 2]];
    }

    // Check column
    if (board.every(row => row[col] === currentPlayer)) {
        return [[0, col], [1, col], [2, col]];
    }

    // Check diagonal (top-left to bottom-right)
    if (row === col && board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return [[0, 0], [1, 1], [2, 2]];
    }

    // Check diagonal (top-right to bottom-left)
    if (row + col === 2 && board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return [[0, 2], [1, 1], [2, 0]];
    }

    return null;
}

function highlightWinningCells(cells) {
    cells.forEach(([row, col]) => {
        const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cell.classList.add('winning-cell');
    });
}

function removeHoverEffect() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('cell-hover');
    });
}
function addHoverEffect() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.add('cell-hover');
    });
}