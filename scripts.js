document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");

    let currentPlayer = "X";
    let gameState = ["", "", "", "", "", "", "", "", ""];
    const winningCombinations = [
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
        const cellIndex = cell.getAttribute("data-index");

        if (gameState[cellIndex] !== "" || checkWin()) {
            return;
        }

        gameState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.style.backgroundColor = currentPlayer === "X" ? "#FFD54F" : "#4FC3F7"; // Yellow for X, Sky blue for O
        cell.style.color = "#34495E"; // Dark slate for text color

        if (checkWin()) {
            messageElement.textContent = `Player ${currentPlayer} wins!`;
            highlightWinningCells();
            return;
        } else if (isBoardFull()) {
            messageElement.textContent = "It's a draw!";
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    }

    function checkWin() {
        return winningCombinations.some(combination => {
            return combination.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function highlightWinningCells() {
        winningCombinations.forEach(combination => {
            if (combination.every(index => gameState[index] === currentPlayer)) {
                combination.forEach(index => {
                    cells[index].style.backgroundColor = "#AED581"; // Light green for winning cells
                    cells[index].style.transform = "scale(1.1)"; // Slightly enlarge winning cells
                });
            }
        });
    }

    function isBoardFull() {
        return gameState.every(cell => cell !== "");
    }

    function restartGame() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => {
            cell.textContent = "";
            cell.style.backgroundColor = "#E3F2FD"; // Reset cell color to light sky blue
            cell.style.transform = "scale(1)"; // Reset cell size
        });
        messageElement.textContent = "";
        currentPlayer = "X";
    }

    cells.forEach((cell, index) => {
        cell.setAttribute("data-index", index);
        cell.addEventListener("click", handleCellClick);
    });

    restartButton.addEventListener("click", restartGame);
});
