const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
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

// creates image elements for the dealer's cards
function dealerCardImage(image) {
    const parent = document.querySelectorAll('.cards')[0]
    let cardImageElement = document.createElement('img')
    cardImageElement.setAttribute('src', image)
    parent.appendChild(cardImageElement)
}

// creates image elements for the user's cards
function userCardImage(image) {
    const parent = document.querySelectorAll('.cards')[1]
    let cardImageElement = document.createElement('img')
    cardImageElement.setAttribute('src', image)
    parent.appendChild(cardImageElement)
}

function removeImages() {
    const parent = document.querySelectorAll('.cards')
    for (let i = 0; i < parent.length; i++) {
        let imgElements = parent[i].querySelectorAll('img')
        for (let j = 0; j < imgElements.length; j++) {
            parent[i].removeChild(imgElements[j])
        }
    }
}

// 'flips' the hole card by replacing the image 
function setHoleCardImage(image) {
    const cardElement = document.querySelectorAll('.cards img')[0]
    cardElement.setAttribute('src', image)
}

function getScore(player) {
    let cards = player.cards
    let score = 0
    for (let i = 0; i < cards.length; i++) {
        if (score > 10 && cards[i].value === 'ace') {
            score += 1
        } else if (score <= 10 && cards[i].value === 'ace') {
            score += 11
        } else if (cards[i].value === 'jack' ||
            cards[i].value === 'queen' ||
            cards[i].value === 'king') {
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
    if (score > 10 && dealer.cards[1].value === 'ace') {
        score += 1
    } else if (score <= 10 && dealer.cards[1].value === 'ace') {
        score += 11
    } else if (dealer.cards[1].value === 'jack' ||
        dealer.cards[1].value === 'queen' ||
        dealer.cards[1].value === 'king') {
        score += 10
    } else {
        score += Number(dealer.cards[1].value)
    }

    // dealer.score = score
    return score
}

function displayScore(score, element) {
    element.innerText = 'Score: ' + score
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
    removeImages()
    createDeck()
    shuffleCards(deck)

    user.cards.push(drawCard())
    dealer.cards.push(drawCard())
    dealer.cards[0].backsideImage = 'images/card-backside.png'

    user.cards.push(drawCard())
    dealer.cards.push(drawCard())

    userCardImage(user.cards[0].image)
    userCardImage(user.cards[1].image)
    dealerCardImage(dealer.cards[0].backsideImage)
    dealerCardImage(dealer.cards[1].image)

    displayScore(getScore(user), document.querySelectorAll('.score')[1])
    displayScore(getInitialDealerScore(), document.querySelectorAll('.score')[0])

    getScore(dealer)
    getScore(user)
}

function hit() {
    user.cards.push(drawCard())
    getScore(user)

    let index = user.cards.length - 1
    userCardImage(user.cards[index].image)
    displayScore(getScore(user), document.querySelectorAll('.score')[1])
}


function dealerDraws() {
    for (let i = 0; i < 5; i++) {
        if (user.score <= 21 && user.score > dealer.score && dealer.score < 19) {
            dealer.cards.push(drawCard())
            let index = dealer.cards.length - 1
            dealerCardImage(dealer.cards[index].image)
        }
        displayScore(getScore(dealer), document.querySelectorAll('.score')[0])
    }
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

function stand() {
    setHoleCardImage(dealer.cards[0].image)
    dealerDraws()
    compareScores()
}

const dealBtn = document.querySelectorAll('.deal')[0]
const hitBtn = document.querySelectorAll('.hit')[0]
const standBtn = document.querySelectorAll('.stand')[0]

dealBtn.addEventListener('click', dealCards)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)






// function playGame() {
//     dealCards()

//     console.log('user score', user.score)
//     console.log('user cards', user.cards)
//     console.log('VISIBLE TO USER dealer score', getInitialDealerScore())
//     console.log('ACTUAL dealer score', dealer.score)
//     console.log('dealer cards', dealer.cards)

//     console.log('------------------')

//     hit()
//     console.log('user score AFTER HIT', user.score)
//     console.log('user cards AFTER HIT', user.cards)
//     console.log('deck length', deck.length)
//     console.log('------------------')

//     dealerDraws()
//     console.log('dealer score AFTER dealerDraws', dealer.score)
//     console.log('dealer cards AFTER dealerDraws', dealer.cards)
//     console.log('deck length', deck.length)

//     console.log('------------------')

//     compareScores()
//     console.log('pushes', user.pushes)
//     console.log('user wins', user.wins)
//     console.log('dealer wins', dealer.wins)

//     console.log('------------------')
//     console.log('------------------')
//     console.log('------------------')
//     console.log('------------------')
//     dealCards()

//     console.log('user score', user.score)
//     console.log('user cards', user.cards)
//     console.log('VISIBLE TO USER dealer score', getInitialDealerScore())
//     console.log('ACTUAL dealer score', dealer.score)
//     console.log('dealer cards', dealer.cards)

//     console.log('------------------')

//     hit()
//     console.log('user score AFTER HIT', user.score)
//     console.log('user cards AFTER HIT', user.cards)
//     console.log('deck length', deck.length)
//     console.log('------------------')

//     dealerDraws()
//     console.log('dealer score AFTER dealerDraws', dealer.score)
//     console.log('dealer cards AFTER dealerDraws', dealer.cards)
//     console.log('deck length', deck.length)

//     console.log('------------------')

//     compareScores()
//     console.log('pushes', user.pushes)
//     console.log('user wins', user.wins)
//     console.log('dealer wins', dealer.wins)
// }

// playGame()

