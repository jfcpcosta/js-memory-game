(function () {
    'use strict';

    const container = document.querySelector('.container');

    const cards = [
        'c2', 'c3', 'c4', 'c5', 'c6', 'c7', 'c8', 'c9', 'c10', 'ca', 'cj', 'ck', 'c2',
        'd2', 'd3', 'd4', 'd5', 'd6', 'd7', 'd8', 'd9', 'd10', 'da', 'dj', 'dk', 'd2',
        'h2', 'h3', 'h4', 'h5', 'h6', 'h7', 'h8', 'h9', 'h10', 'ha', 'hj', 'hk', 'h2',
        's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10', 'sa', 'sj', 'sk', 's2'
    ];
    const board = [];
    let pairs;

    let turnCard1;
    let turnCard2;

    function createBoard() {
        generateCards();
        shuffle();

        pairs = 0;
        container.innerHTML = '';
        board.forEach((card, index) => {
            const node = `
                <div class="flip-container" data-index="${index}">
                    <div class="flipper">
                        <div class="front">
                            <img src="assets/deck_6_large.png" width="100%">
                        </div>
                        <div class="back">
                            <img src="assets/card_b_${card}_large.png" width="100%">
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += node;
        });

        const flipContainers = document.querySelectorAll('.flip-container');
        flipContainers.forEach(fc => fc.addEventListener('click', toggleCard, false));
    }

    function toggleCard(event) {
        event.currentTarget.classList.add('hover');

        if (turnCard1) {
            turnCard2 = event.currentTarget;
            verifyPair();
        } else {
            turnCard1 = event.currentTarget;
        }
    }

    function verifyPair() {

        const card1Index = turnCard1.dataset.index;
        const card2Index = turnCard2.dataset.index;

        if (board[card1Index] == board[card2Index]) {
            turnCard1.removeEventListener('click', toggleCard, false);
            turnCard2.removeEventListener('click', toggleCard, false);

            pairs++;
            verifyEnd();
        } else {
            let auxCard1 = turnCard1;
            let auxCard2 = turnCard2;
            let timer = setTimeout(() => {
                auxCard1.classList.remove('hover');
                auxCard2.classList.remove('hover');

            }, 2000);
        }

        turnCard1 = null;
        turnCard2 = null;
    }

    function verifyEnd() {
        if (pairs == 6) {
            alert('You win!');
            if (confirm('New game?')) {
                createBoard();
            }
        }
    }

    function generateCards() {
        while (board.length < 12) {
            let randomIndex = Math.floor(Math.random() * cards.length);
            let card = cards[randomIndex];

            if (board.indexOf(card) > -1) {
                continue;
            }

            board.push(card);
            board.push(card);
        }
    }

    function shuffle() {
        for (let i = board.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [board[i], board[j]] = [board[j], board[i]];
        }
    }

    document.querySelector('#newGameButton').addEventListener('click', createBoard, false);
    createBoard();
})();