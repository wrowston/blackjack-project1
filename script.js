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

function getScore(player) {
    let cards = player.cards
    let score = 0
    for (let i = 0; i < cards.length; i++) {
        if (score > 10 && cards[i].value === 'Ace') {
            score += 1
        } else if (score <= 10 && cards[i].value === 'Ace') {
            score += 11
        } else if (cards[i].value === 'J' ||
        cards[i].value === 'Q' ||
        cards[i].value === 'K') {
            score += 10
        } else {
            score += Number(cards[i].value)
        }   
    }
    player.score = score
    return player.score
}

function getDealerScore() {
    let score = 0
    if (score > 10 && dealer.cards[1].value === 'Ace') {
        score += 1
    } else if (score <= 10 && dealer.cards[1].value === 'Ace') {
        score += 11
    } else if (dealer.cards[1].value === 'J' ||
    dealer.cards[1].value === 'Q' ||
    dealer.cards[1].value === 'K') {
        score += 10
    } else {
        score += Number(dealer.cards[1].value)
    }
    
    dealer.score = score
    return score
}

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

function dealCards() {
    deck.length = 0
    createDeck()
    shuffleCards(deck)

    user.cards.push(drawCard())
    dealer.cards.push(drawCard())
    dealer.cards[0].backsideImage = 'images/card-backside.png'

    user.cards.push(drawCard())
    dealer.cards.push(drawCard())

    getScore(user)
    getDealerScore()
}
dealCards()

// console.log(user.score)
// console.log(user.cards)
console.log(dealer.score)
console.log(dealer.cards)
// console.log(dealer.cards)

function hit() {
    user.cards.push(drawCard())
    getUserScore(user)
}

// hit()
// console.log(user.score)
// console.log(user.cards)
// console.log(deck[0])
console.log(deck.length)