const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'Ace']
const cardSuit = ['hearts', 'spades', 'clubs', 'diamonds']
let deck = []
let user = {
    cards: [],
    score: 0
}
let dealer = {
    cards: [],
    score: 0
}

function createDeck() {
    for (let i = 0; i < cardSuit.length; i++) {
        for (let j = 0; j < cardValue.length; j++) {
            let card = {}
            card.value = cardValue[j]
            card.suit = cardSuit[i]
            card.image = `images/card-images/${cardValue[j]}_of_${cardSuit[i]}.png`
            deck.push(card)
        }
    }
}

createDeck()
// console.log(deck[17].image)
// console.log(deck)

// let cardElement = document.createElement('img')
// cardElement.setAttribute('src', deck[17].image)
// document.body.appendChild(cardElement)

function shuffleCards(deck) {
    for (let i = 0; i < deck.length; i++) {
        let randomIndex = Math.floor(Math.random() * deck.length)

        let tempValue = deck[i] 
        deck[i] = deck[randomIndex]
        deck[randomIndex] = tempValue
    }
    return deck
}
// shuffleCards(deck)

function drawCard() {
    const cardDrawn = deck[0]
    deck.shift()
    return cardDrawn
}