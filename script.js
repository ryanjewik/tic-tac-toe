// script.js

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
});

function resetGame() {
    board = [
        ['', '', ''],
        ['', '', '']
        ['', '', '']
    ];
    currentPlayer = 'X';
    const playArea = document.getElementById('play-area');
    playArea.innerHTML = ''; // Clear the play area
    createGrid();
}

function createGrid() {
    const playArea = document.getElementById('play-area');
    playArea.innerHTML = ''; // Clear any existing content

    const gridSize = 3; // 3x3 grid
    for (let row = 0; row < gridSize; row++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
        for (let col = 0; col < gridSize; col++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            cellDiv.dataset.row = row;
            cellDiv.dataset.col = col;
            cellDiv.addEventListener('click', handleCellClick);
            rowDiv.appendChild(cellDiv);
        }
        playArea.appendChild(rowDiv);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const row = cell.dataset.row;
    const col = cell.dataset.col;

    if (board[row][col] === '') {
        board[row][col] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin(row, col)) {
            alert(`${currentPlayer} wins!`);
            resetGame();
        } else if (board.flat().every(cell => cell !== '')) {
            alert('It\'s a draw!');
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(row, col) {
    // Check row
    if (board[row].every(cell => cell === currentPlayer)) {
        return true;
    }

    // Check column
    if (board.every(row => row[col] === currentPlayer)) {
        return true;
    }

    // Check diagonal (top-left to bottom-right)
    if (row === col && board.every((row, index) => row[index] === currentPlayer)) {
        return true;
    }

    // Check diagonal (top-right to bottom-left)
    if (parseInt(row) + parseInt(col) === 2 && board.every((row, index) => row[2 - index] === currentPlayer)) {
        return true;
    }

    return false;
}