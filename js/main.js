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


const descriptionGame = document.querySelector('.description-game');

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

const SKIRT = {
    football: ['arsenal', 'barcelona', 'juventus', 'liverpool', 'inter', 'chelsea', 'everton', 'westham', 'psg'],
    flags: ['spain', 'germany', 'costa-rica', 'india', 'argentina', 'sa', 'latvia', 'norway', 'kiribati']
}

let currentCards;

const newGameBtn = document.querySelector('.new-game');
const board = document.querySelector('.board');
const stopGameBtn = document.querySelector('.stop-game');
const btnDrpdwnHeader = document.querySelector('.header-content__dropdown')

newGameBtn.addEventListener('click', () => startGame());
stopGameBtn.addEventListener('click', () => stopGame());

let interval;
const timer = document.querySelector('.timer');

let targetCard = null;

function startGame() {
    buildBoard(skirt, difficulty);

    descriptionGame.style.display = 'none';
    btnDrpdwnHeader.style.visibility = 'hidden';
    newGameBtn.style.display = 'none';
    stopGameBtn.style.display = 'block';
    addTimer();
    timer.style.display = 'flex';
} 

function stopGame() {
    btnDrpdwnHeader.style.visibility = 'visible';
    descriptionGame.style.display = 'block';
    newGameBtn.style.display = 'block';
    stopGameBtn.style.display = 'none';
    board.innerHTML = '';
    clearInterval(interval);
    timer.style.display = 'none';
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

    const openCard = document.querySelectorAll('.card');

    let hasFlippedCard = false;
    let firstCard;
    let secondCard;
    let lockBoard = false;
  
    function flipCard() {
        if (lockBoard) return;
        this.classList.add('flip');
  
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
    
        secondCard = this;
        hasFlippedCard = false;
    
        checkForMatch();
        gameFinished();
    }
  
    function checkForMatch() {
        let isMatch = firstCard.dataset.value === secondCard.dataset.value;
        isMatch ? disableCards() : unflipCards();
    }
   
    function disableCards() {
        setTimeout(() => {
            firstCard.style.visibility = 'hidden';
            secondCard.style.visibility = 'hidden';
            firstCard.classList.add('remove')
            secondCard.classList.add('remove')
        }, 500);
    }
    
    function gameFinished() {
        
        let removeCards = Array.from(document.querySelectorAll('.remove'))
        
        if (totalAmount === removeCards.length + 2) {
            board.innerHTML = 'Congratulations! You are the winner of the game! If you want to try again click button "New Game"'

            clearInterval(interval);
        }
    }
  
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            lockBoard = false;
        }, 500);
    }
        
    openCard.forEach(card => card.addEventListener('click', flipCard));
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
    wrapper.dataset.value = path;

    const frontCard = document.createElement('div');
    frontCard.classList.add('front');

    const backCard = document.createElement('div');
    backCard.classList.add('back');

    const imgBack = document.createElement('img');
    imgBack.src = `../images/${path}.png`;
    
    backCard.append(imgBack);
    wrapper.append(frontCard);
    wrapper.append(backCard);
    return wrapper;
}

function addTimer() {
    let clock = document.querySelector('.clock');
    let min = document.querySelector('.min');
    let sec = document.querySelector('.sec');

    let null_clock = 0;
    let null_min = 0;
    let null_sec = 0;

    interval = setInterval(() => {
        clock.innerHTML = null_clock;
        min.innerHTML = null_min;
        sec.innerHTML = null_sec;
        null_sec++;

        if (null_sec >= 60) {
            null_min++;
            null_sec = 0;
        } else if (null_min >= 60) {
            null_clock++;
            null_min = 0;
        } else if (null_clock >= 60) {
            null_clock = 0;
        }
    }, 1000);
}
