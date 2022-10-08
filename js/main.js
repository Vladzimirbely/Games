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
