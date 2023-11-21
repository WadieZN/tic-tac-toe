
let gameboard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer;

function createPlayer(name, marker) {
    return { name, marker };
}

const player1 = createPlayer('Player 1 "X"', 'X');
const player2 = createPlayer('Player 2 "O"', 'O');

function switchPlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    const displayTurn = document.querySelector('.turn');

    while (displayTurn.firstChild) {
        displayTurn.removeChild(displayTurn.firstChild);
    }

    const turn = document.createElement('h2');
    turn.textContent = currentPlayer.name;
    displayTurn.appendChild(turn);

}

function displayBoard() {

    const container = document.querySelector('.gameboard');

    gameboard.forEach((value, index) => {

        currentPlayer = player1;
        const squares = document.createElement('div');
        squares.setAttribute('class', 'squares');
        squares.setAttribute('id', `square${index}`);
        container.appendChild(squares);

        if (!winningPlayer()) {
            squares.addEventListener('click', () => {
                if (!squares.textContent) {
                    squares.textContent = currentPlayer.marker;
                    gameboard[index] = currentPlayer.marker;
                    winningPlayer();
                    switchPlayer();
                }
            });
        }

        document.querySelector('#reload').addEventListener('click', () => {
            squares.textContent = '';
        });
    });

    function winningPlayer() {
        let winningSquares = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        const overlay = document.querySelector('.overlay-container');
        const displayWinner = document.querySelector('.display-winner');

        for (let i = 0; i < winningSquares.length; i++) {
            const [a, b, c] = winningSquares[i];

            if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
                overlay.style.display = 'block';
                displayWinner.textContent = `The winner is: ${currentPlayer.name}`;
                break;
            } else if (!gameboard.includes('')) {
                overlay.style.display = 'block';
                displayWinner.textContent = 'Draw, no one wins';
            }
        }

        document.querySelector('#reload').addEventListener('click', () => {
            gameboard = ['', '', '', '', '', '', '', '', ''];
            overlay.style.display = 'none';
        });
    }
}

displayBoard();