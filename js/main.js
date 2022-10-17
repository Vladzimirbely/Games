const skirtBtn = document.querySelector('.dropdown-skirt');
const btnSkirt = document.querySelector('.btn-skirt-cards');
const difficultyBtn = document.querySelector('.dropdown-difficulty');
const btnDifficulty = document.querySelector('.btn-difficulty-cards');

let skirt;
let difficulty;

skirtBtn.addEventListener('click', ({ target }) => {
    const { value } = target.dataset;
    btnSkirt.textContent = value;
    skirt = value;
});

difficultyBtn.addEventListener('click', ({ target}) => {
    const { value } = target.dataset;
    btnDifficulty.textContent = value;
    difficulty = value;
});

// const newGame = document.querySelector('.new-game');
// const gameCards = document.querySelector('.game');
const descriptionGame = document.querySelector('.description-game');

// newGame.addEventListener('click', function(e) {
//     descriptionGame.style.display = 'none';
//     gameCards.style.display = 'flex';
// });

// const cards = document.querySelectorAll('.cards');
// const cardCover = document.querySelector('.cards-cover');
// const cardContent = document.querySelector('.cards-content');

// cards.forEach((card) => card.addEventListener('click', function(e) {
//     cardCover.style.display = 'none';
//     cardContent.style.display = 'flex';
// }));

const DIFFICULTY = {
    low: 'low',
    medium: 'medium',
    hard: 'hard'
}

const BOARD = {
    low: [3, 2],
    medium: [4, 3],
    hard: [6, 3]
}

const SKIRT_BACK = {
    back: ['football', 'football', 'football', 'football', 'football', 'football', 'football', 'football', 'football']
}

const SKIRT = {
    football: ['arsenal', 'barcelona', 'juventus', 'liverpool', 'inter', 'chelsea', 'everton', 'westham', 'psg']
}

let currentCards;

const newGameBtn = document.querySelector('.new-game');
const board = document.querySelector('.board');
const stopGameBtn = document.querySelector('.stop-game');
const btnDrpdwnHeader = document.querySelector('.header-content__dropdown')

newGameBtn.addEventListener('click', () => startGame());
stopGameBtn.addEventListener('click', () => stopGame());

let targetCard = null;

board.addEventListener('click', ({ target }) => {
    let curr = target;

    while (curr.tagName !== 'IMG') {
        curr = curr.parentNode;
    }

    if (!targetCard) targetCard = curr;
    else {
        if (targetCard.src === curr.src && targetCard !== curr) {
            targetCard.hidden = true;
            curr.hidden = true;
        } 
    
        targetCard = null;
    }
})

function startGame() {
    buildBoard(skirt, difficulty);

    descriptionGame.style.display = 'none';
    btnDrpdwnHeader.style.visibility = 'hidden';
    newGameBtn.style.display = 'none';
    stopGameBtn.style.display = 'block';
} 

function stopGame() {
    btnDrpdwnHeader.style.visibility = 'visible';
    newGameBtn.style.display = 'block';
    stopGameBtn.style.display = 'none';
    board.innerHTML = '';
}

function buildBoard() {
    const [ rowCount, colCount ] = BOARD[difficulty];
    const totalAmount = rowCount * colCount;
    const pathes = SKIRT[skirt].slice(0, totalAmount / 2);

    currentCards = [...pathes, ...pathes];
    shuffleCards();

    const rows = [];

    for (let i = 0; i < rowCount; i++) {
        rows.push(createRow(colCount));
    }

    rows.forEach(item => board.append(item));
}

function shuffleCards() {
    if (currentCards && currentCards.length) {
        currentCards.sort(() => 0.5 - Math.random());
    }
}

function createRow(colCount) {
    const row = document.createElement('div');

    for (let i = 0; i < colCount; i++) {
        const card = createCard(currentCards.pop());
        row.append(card);
    }

    return row;
}

function createCard(path) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('card');

    const frontCard = document.createElement('div');
    frontCard.classList.add('front');

    const backCard = document.createElement('div');
    backCard.classList.add('back');

    const imgFront = document.createElement('img');
    imgFront.src = `../images/football.png`;

    const imgBack = document.createElement('img');
    imgBack.src = `../images/${path}.png`;
    
    frontCard.append(imgFront);
    backCard.append(imgBack);
    wrapper.append(frontCard);
    wrapper.append(backCard);
    return wrapper;
}

   