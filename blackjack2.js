var finaldeck;      // final deck global variable for pre-shuffled deck played
var players = {     // players is an object encompassing player and dealer
    player: {},
    dealer: {}
}

var newbet;

//Start or restart the game by setting up new objects to global variables.
function resetGame()
{   
    betwin = 0
    $("#game-results").empty().hide(); // clear out and hide any results from a previous game
    finaldeck = new Deck();
    finaldeck.deck = shuffleDeck(finaldeck.deck);  //deck property of finaldeck creates a new deck:  create new shuffled deck. Use itself as a parameter to shuffle itself
    players.player = new Player("#player");
    players.dealer = new Player("#dealer");
    players.player.getBet();

    players.player.hit(finaldeck.deck); //The "hit" receives first card.
    players.dealer.hit(finaldeck.deck);

    // hide the dealer's first card
    var card = players.dealer.hand[0];
    card.toggleVisibility();
    card.displayCard();

    players.player.hit(finaldeck.deck);
    players.dealer.hit(finaldeck.deck);
}

// start a new game
resetGame();
    
  


 //Betting functionality: ONLY GETS VALUE FROM CLICK SO FAR



//click event on the #hit button
$("#hit").click(function() {

    players.player.hit(finaldeck.deck); // player takes another card

    // check if player busted
    if (BustCheck(players.player))
    {
        showTheResult("Player busted");
        showPlayAgain();
    }
});

// Click event handler for when the user clicks the Stand button. 
 //Dealer starts its turn will continue to play until his hand > 16.
$("#stand").click(function() {
    while (players.dealer.countHand() <= 16)
    {
        players.dealer.hit(finaldeck.deck); // dealer takes another card
    }

    // check if dealer busted
    if (BustCheck(players.dealer))
    {
        showTheResult("Dealer busted");
        showPlayAgain();
    }
    // dealer didn't bust, check which player won 
    else 
    {
        checkWin();
    }
});






 
function BustCheck(player)
{
    return (player.countHand() > 21) ? true : false;
}

 
function checkWin()
{
    // check if player wins
    if (players.player.countHand() > players.dealer.countHand())
    {
        showTheResult("Player wins");
    }
    // else check if dealer wins
    else if (players.player.countHand() < players.dealer.countHand())
    {
        showTheResult("Dealer wins");
    }
    // else check if both players tied
    else if (players.player.countHand() == players.dealer.countHand())
    {
        showTheResult("Push");
    }

    // display the play again button after determining the winner
    showPlayAgain();
}


// Display the play again button.
 
function showPlayAgain()
{
    $("#play-again").show();
    $("#hit, #stand").prop("disabled", true); // disable other buttons until play again is pressed
    $("#play-again").click(function() {
        $(".card").remove(); // remove all existing cards from UI
        resetGame();           // start the game over
        $(this).hide();           // hide the button again
        $("#hit, #stand").prop("disabled", false); // re-enable the hit and stand buttons
    });
}

 //Show the hidden cards after the game

function showTheResult(resultsText)
{
   // Run the toggleVisibility function and diplayCard methods - check each card of dealer hand.
    players.dealer.hand.forEach(function(card) {
        if (!card.visibility)
        {
            card.toggleVisibility();
            card.displayCard();
        }
    });
     // displayHand property of dealer
    players.dealer.displayHand();

// Aoppend  the appropriate text to gameresults div
    $("#game-results").append("<p>" + resultsText + "</p>").show();
}