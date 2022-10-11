const skirt = document.querySelector('.dropdown-skirt');
const btnSkirt = document.querySelector('.btn-skirt-cards');
const difficulty = document.querySelector('.dropdown-difficulty');
const btnDifficulty = document.querySelector('.btn-difficulty-cards');

skirt.addEventListener('click', function(evt) {
    btnSkirt.innerHTML = evt.target.getAttribute('alt');
});

difficulty.addEventListener('click', function(evt) {
    btnDifficulty.innerHTML = evt.target.getAttribute('class');
});

const newGame = document.querySelector('.new-game');
const gameCards = document.querySelector('.game');
const descriptionGame = document.querySelector('.description-game');

newGame.addEventListener('click', function(e) {
    descriptionGame.style.display = 'none';
    gameCards.style.display = 'flex';
});

const cards = document.querySelectorAll('.cards');
const cardCover = document.querySelector('.cards-cover');
const cardContent = document.querySelector('.cards-content');

cards.forEach((card) => card.addEventListener('click', function(e) {
    cardCover.style.display = 'none';
    cardContent.style.display = 'flex';
}));
    