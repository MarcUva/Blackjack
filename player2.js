//Player Object: his hand, his playing area, and his bankroll//
function Player(playingArea)
{
    this.hand = [];
    this.playingArea = $(playingArea);
    this.amountbet
 }


 
  


Player.prototype.playerMoney = function(totalcash){
totalcash = (2000 + betwin);

return totalcash;
}

//THIS DOESN'T WORK//
// Player.prototype.playerBet = function(){
// $(document).ready(function() {
//    $('#bet').click(function() {
// return $('#gamebet').val()
//   })
//  })
//    }


Player.prototype.getBet = function() {
  $('#bet').click(function() {
     this.amountbet = $('#gamebet').val()
   alert(" you bet " + this.amountbet)
     return ;
     })}


/**
 * Display this player's hand of cards as well as the player's current total on the page.
 */
Player.prototype.displayHand = function()
{   //WITHOUT THIS DECLARATION THE HAND WON'T SHOW! MAKE SELF PLAYER OBJECT.  THIS WOULD POINT TO THIS.HAND OTHERWISE.
    var self = this; 
    var hiddenCard;
     
   

 //IE: Because card objects made by the card constructor don't exist in an array - but as data that can be referenced by 'card'
//we don't push values into the array
//the way we give the player a 'card' to put in his Hand array requires us to use 
//forEach(Player Object has a hand which is an array:
//that .displayCard to append the unique card element to the playingArea of player. 
//I need to declare SELF to This to reference Player object. Because if I used "this.playingArea inside the this.hand.forEach function it would refer to this.hand"!! Confusing.
//the original Player object because this function needs to define hiddencard by the properties of the data.
    this.hand.forEach(function(card) {
        card.displayCard(self.playingArea);
        if (!card.visibility)
        {
            hiddenCard = card; // get a reference to the card without visibility
        }
    });

  
    var handTotal = this.countHand();
    // if this hand has a hidden card, don't add its value to the hand total
    if (hiddenCard)
    {
        handTotal -= hiddenCard.getValue();
    }

    // update the current total and bankroll on the page
   
    this.playingArea.find(".total").text(handTotal);
    this.playingArea.find(".playerbankroll").text(this.playerMoney);
}

//Hit property methodo of Player passes the shuffled deck through the parameter
//dealACard function deals to the player, where a card is pushed to his hand.
Player.prototype.hit = function(deck)
{
    this.hand.push(dealACard(deck));
    this.displayHand();
}


 
 


//countHand property of Player will check for an Ace and total up the card values - it uses the forEach method to 
//to get a card for each hand.
Player.prototype.countHand = function()
{
    var total = 0;
    
    var seenAnAce = false;

    // add each card's value to the total
    this.hand.forEach(function(card) {
        if (card.getName() === 'A') 
        {
            seenAnAce = true;
        }
        total += card.getValue();
    });

    // determine if Ace should be 1 or 11 points
    if (seenAnAce) 
    {
        if (total <= 11) 
        {
            total += 10;
        }
    }
    return total;
}


 

