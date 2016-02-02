//MAKE THE DECK//

var AllCards = 13; // Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K

 //deck property of Deck function is what is returned from createDeck function.
 //deck property is an array of 52 created cards.
function Deck()
{
    this.deck = createDeck();
}


//I want to make a for loop that references one specific element of the Suits object.
///Like "i" in a for loop, suit is just a variable that is set to store a value for the functionality of the loop 
    // Suit is defined as 1 new suit for each iteration.
    //We need a nested for loop to assign 1 suit per every 13 cards. Each index value pertains to one of the 13 cards.
    // we define the variable card by the Card Constructor.  The for loops create parameters for 13 cards in 4 different suits
    //for the Card Constructor to parse.  variable card is each of those cards that the Card Constructor creates.
    //We then push each card to our CreatedDeck array and return the created Deck.
    /// For suit in suits f means that for each property of suits (clubs,spades,diamonds,)
   
    //I made a mistake with suits - I should have made it an array so I could iterate through it with i=0;i<suits.length;i++
    //but I made it one object with 4 properties - It turns out you can iterate through object properties like this:
function createDeck()
{
    var createdDeck = [];
    for (var suit in suits)
    {  //var suit is just a value for this function, a suit = each of the four (suits) properties of suit object
        for (var index = 1; index <= AllCards; index++)
        {//nested for loop to create 13 cards from 4 suits
            var card = new Card(index, suits[suit]);
            createdDeck.push(card);
        } //a card is an object that the card Constructor creates.
    }
    return createdDeck;
}

  //SHUFFLE FUNCTION// Taken from Stack Overflow and attributed to my variables:
//(http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
// Index is amount of cards needed to shuffle - 1 (because 0 is indexed in the decktoShuffle array)
//The index is greater than 0 but subtracts itself after each iteration of the for loop until no more cards are left to shuffle.
//define randVal as the value returned from the randomValue function with cards left to shuffle as a parameter.(index)
 //Var temp is a number that references a specific card in the deck, and is set equal to a random 
 //so temp is now a number that references another card in the deck.  Then temp is defined as the value that points to the deck itself. 
 //temp just represents a random spot in the array that refers to a card, and that random spot 
 //is defined by how many cards are left to shuffle.  
function shuffleDeck(deckToShuffle)
{
    for (var index = deckToShuffle.length - 1; index > 0; index--)
    {
        var randVal = randomValue(index + 1); // make a random index
        var temp = deckToShuffle[index];
        deckToShuffle[index] = deckToShuffle[randVal];
        deckToShuffle[randVal] = temp;
    }
    return deckToShuffle;
}

//This returns a random value based on the index.  The index is a number that decreases each iteration of deckToShuffle
//because it represents what spot in the Deck needs to be randomly assigned to another spot.  The shuffle function only
//shuffles each card once, so it keeps track of what is left to shuffle - that is why bound parameter = index +1.//
//If 3 cards need to be re-indexed, it gives each of the 3 cards
//a random value from 1 to 3. Eventually it stops rearranging the elements in deckToShuffle and returns what it is composed of.
function randomValue(bound)
{   
    return (Math.floor(Math.random() * bound));
}

//dealACard function used in gameplay, The card dealt is the last value popped from a shuffled deck.
function dealACard(deckToUse)
{
    return deckToUse.pop();
}