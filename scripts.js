document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-button');
    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = cell.getAttribute('data-index');

        if (gameState[cellIndex] !== "" || checkWinner()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWinner()) {
            statusText.textContent = `${currentPlayer} has won!`;
        } else if (gameState.every(cell => cell !== "")) {
            statusText.textContent = 'Draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusText.textContent = `It's ${currentPlayer}'s turn`;
        }
    }

    function checkWinner() {
        let roundWon = false;
        for (let i = 0; i < winConditions.length; i++) {
            const winCondition = winConditions[i];
            let a = gameState[winCondition[0]];
            let b = gameState[winCondition[1]];
            let c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        return roundWon;
    }

    function restartGame() {
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `It's ${currentPlayer}'s turn`;
        cells.forEach(cell => cell.textContent = '');
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    restartButton.addEventListener('click', restartGame);

    statusText.textContent = `It's ${currentPlayer}'s turn`;
});
