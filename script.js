const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'Ace']
const cardSuit = ['hearts', 'spades', 'clubs', 'diamonds']
let deck = []
let user = {
    cards: [],
    score: 0,
    wins: 0,
    pushes: 0
}
let dealer = {
    cards: [],
    score: 0,
    wins: 0
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

//testing creating image element
createDeck()
const cardParentEl = document.querySelectorAll('.cards')[0]
let cardImageElement = document.createElement('img')
cardImageElement.setAttribute('src', deck[17].image)
cardParentEl.appendChild(cardImageElement)

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

// use to display dealer score when only one card is shown
function getInitialDealerScore() {
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

    // dealer.score = score
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
    user.cards.length = 0
    user.score = 0
    dealer.cards.length = 0
    dealer.score = 0
    deck.length = 0
    createDeck()
    shuffleCards(deck)

    user.cards.push(drawCard())
    dealer.cards.push(drawCard())
    dealer.cards[0].backsideImage = 'images/card-backside.png'

    user.cards.push(drawCard())
    dealer.cards.push(drawCard())

    getScore(user)
    getInitialDealerScore()
    getScore(dealer)
}

function hit() {
    user.cards.push(drawCard())
    getScore(user)
}


function dealerDraws() {
    console.log('dealer score 1st time in function', dealer.score)
    for (let i = 0; i < 5; i++) {
        if (user.score <= 21 && user.score > dealer.score && dealer.score < 19) {
            dealer.cards.push(drawCard())
        }
        getScore(dealer)
    }
    console.log('dealer score 2nd time in function', dealer.score)
}


function compareScores() {
    let userWins = user.wins
    let dealerWins = dealer.wins
    let pushes = user.pushes

    if (dealer.score <= 21) {
        if (user.score <= 21 && user.score > dealer.score) {
            userWins++
            console.log('user wins')
        } else if (dealer.score === user.score) {
            pushes++
            console.log("it's a push")
        } else {
            dealerWins++
            console.log('dealer wins')
        }
    } else {
        if (user.score <= 21) {
            userWins++
            console.log('user wins')
        }
    }
    user.wins = userWins
    dealer.wins = dealerWins
    user.pushes = pushes
}

function playGame() {
    dealCards()

    console.log('user score', user.score)
    console.log('user cards', user.cards)
    console.log('VISIBLE TO USER dealer score', getInitialDealerScore())
    console.log('ACTUAL dealer score', dealer.score)
    console.log('dealer cards', dealer.cards)

    console.log('------------------')

    hit()
    console.log('user score AFTER HIT', user.score)
    console.log('user cards AFTER HIT', user.cards)
    console.log('deck length', deck.length)
    console.log('------------------')

    dealerDraws()
    console.log('dealer score AFTER dealerDraws', dealer.score)
    console.log('dealer cards AFTER dealerDraws', dealer.cards)
    console.log('deck length', deck.length)

    console.log('------------------')

    compareScores()
    console.log('pushes', user.pushes)
    console.log('user wins', user.wins)
    console.log('dealer wins', dealer.wins)

    console.log('------------------')
    console.log('------------------')
    console.log('------------------')
    console.log('------------------')
    dealCards()

    console.log('user score', user.score)
    console.log('user cards', user.cards)
    console.log('VISIBLE TO USER dealer score', getInitialDealerScore())
    console.log('ACTUAL dealer score', dealer.score)
    console.log('dealer cards', dealer.cards)

    console.log('------------------')

    hit()
    console.log('user score AFTER HIT', user.score)
    console.log('user cards AFTER HIT', user.cards)
    console.log('deck length', deck.length)
    console.log('------------------')

    dealerDraws()
    console.log('dealer score AFTER dealerDraws', dealer.score)
    console.log('dealer cards AFTER dealerDraws', dealer.cards)
    console.log('deck length', deck.length)

    console.log('------------------')

    compareScores()
    console.log('pushes', user.pushes)
    console.log('user wins', user.wins)
    console.log('dealer wins', dealer.wins)
}

playGame()

