
//Suits is one object that has global scope because I used prototype properties of objects which needs to access suits globally
// because prototype property of objects can't access local scope of objects.

var suits = ({
    clubs: { char: '&clubs;', suitClass: 'clubs' },
    spades: { char: '&spades;', suitClass: 'spades' },
    hearts: { char: '&hearts;', suitClass: 'hearts' },
    diams: { char: '&diams;', suitClass: 'diams' }
});