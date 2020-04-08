function createDeck() {
    cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'Ace']
    cardSuit = ['Hearts', 'Spades', 'Clubs', 'Diamonds']
    deck = []

    for (let i = 0; i < cardSuit.length; i++) {
        for (let j = 0; j < cardValue.length; j++) {
            deck.push(cardValue[j] + ' of ' + cardSuit[i])
        }
    }
    console.log(deck)
}
createDeck()

