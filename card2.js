///CARD FUNCTIONALITY////
//Card constructor//



// The visibility property is true from a fresh card because only 1 card needs to be hidden, I use a toggle to set vis to false on one.

// I create a property of the Card Constructor called cardelement which uses a concatenated string 
//to draw a unique card.  Every card object that is made via the constructor has a cardelement property that is unique.
//But I don't append the JQuery to the html, I save it with the .data method.  
//With data, I can save cardelement as a DOM element.  The Card Constructor now dynamically creates
//DOM elements - once the card is made, the data is made.  It doesn't visually show up because
//I need a function to display it - but it exists - I just have to point to it.

function Card(value, suit) 
{
     
    this.value = value;
    this.suit = suit;
    this.visibility = true; // Visibility is true by default since only 1 card needs to be hidden

    // cardelement:  Identify the entire card and apply the entire JQuery to the property of each new Card object
    this.cardelement = $("<div class='card " + this.suit.suitClass + "'>" +
                   "<span class='rank'>" + this.getName() + "</span>" +
                   "<span class='suit'>" + this.suit.char + "</span>" +
                   "</div>").data('card', this);
}

//From stackoverflow I learned that I could use prototype instead of defining a method directly from the constructor.
//A prototype of the Card Constructor shares the same value/suit/visibility property of the Card Constructor.
// So my Card.prototype.getName function can parse this.value because it's value is one shared property of Card().
//Coding prototypes was helpful for my thought process because it leads to more explicit code, is easier for me to piece together
//and also because it's useful for understanding how Blackjack uses an Object Oriented design: For me, the prototype property 
//better conceptualizes Object Oriented Programming because it deals with the inheritence of properties of an object.  There is a 
//sense that properties have permanence when you deal with inheritence. You can change the property of
//the object prototype and it propagates to all objects.  Because prototypes share the same properties of their referenced object
//the code seems to emphasize the importance of a object properties - if you write many prototypes of an object, you have a sense 
//of that object and it's properties' importance and scale in your program.  This is not necessarily the case with functions.
//The downside is that prototypes cannot access the local scope information in the object.  
Card.prototype.getName = function()
{
    if (this.value > 1 && this.value <= 10)
    {
        return this.value;
    } else {
        switch(this.value)
        {
            case 1:
                return 'A';
            case 11:
                return 'J';
            case 12:
                return 'Q';
            case 13:
                return 'K';
        }
    }
}

//Get the number value of the card: 
Card.prototype.getValue = function()
{
    return (this.value > 10) ? 10 : this.value;
}

//Toggle visibility of card
  //This is similar to what Thom showed us with !turn in Tic-Tac-Toe.  
    //It togges the property on and off depending on current property.
Card.prototype.toggleVisibility = function()
{
    this.visibility = !this.visibility;
    this.updateCard();
}

//This function appends the card element.
//In the code: The game will run the displayCard function to invoke the Jquery for a card's graphics to be displayed during gameplay
//Now I can visually represent a dealer or player's hand by writing this function invokes a specific element of the card.
Card.prototype.displayCard = function(location)
{
    $(location).append(this.cardelement);
}

/**
 * Update the card elements class attribute based on the card's visibility.
 */
Card.prototype.updateCard = function()
{
    if (this.visibility)
    {
        this.cardelement.removeClass("back").addClass(this.suit.suitClass);
    } else 
    {
        this.cardelement.removeClass(this.suit.suitClass).addClass("back");
    }
}