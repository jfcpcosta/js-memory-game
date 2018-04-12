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

    let turnCard1;
    let turnCard2;

    function createBoard() {
        generateCards();
        shuffle();

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

    createBoard();
})();