const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
const cardSuit = ['hearts', 'spades', 'clubs', 'diamonds']
let deck = []
let user = {
    name: 'User',
    cards: [],
    score: 0,
    wins: 0,
    pushes: 0,
    push: 'Push'
}
let dealer = {
    name: 'Dealer',
    cards: [],
    score: 0,
    wins: 0
}
const dealBtn = document.querySelectorAll('.deal')[0]
const hitBtn = document.querySelectorAll('.hit')[0]
const standBtn = document.querySelectorAll('.stand')[0]
hitBtn.disabled = true
standBtn.disabled = true

//-------------------------------------
//------------CARD HANDLING------------
//-------------------------------------
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

function shuffleCards(deck) {
    for (let i = 0; i < deck.length; i++) {
        let randomIndex = Math.floor(Math.random() * deck.length)

        let tempValue = deck[i]
        deck[i] = deck[randomIndex]
        deck[randomIndex] = tempValue
    }
    return deck
}

function drawCard(player) {
    const cardDrawn = deck[0]
    deck.shift()
    player.cards.push(cardDrawn)
    return cardDrawn
}

function newGame() {
    user.cards.length = 0
    user.score = 0
    dealer.cards.length = 0
    dealer.score = 0
    deck.length = 0
    removeImages()
    createDeck()
    shuffleCards(deck)
    resetMessage()
    document.querySelectorAll('.blackjack-message')[0].innerText = ''
}

function dealCards() {
    drawCard(user)
    drawCard(dealer)
    drawCard(user)
    drawCard(dealer)
}

//------------------------------------
//--------------IMAGES----------------
//------------------------------------
// creates image elements for the dealer's cards
function dealerCardImage(image) {
    const parent = document.querySelectorAll('.cards')[0]
    let cardImageElement = document.createElement('img')
    cardImageElement.setAttribute('src', image)
    parent.style.padding = 0
    parent.appendChild(cardImageElement)
}

// creates image elements for the user's cards
function userCardImage(image) {
    const parent = document.querySelectorAll('.cards')[1]
    let cardImageElement = document.createElement('img')
    cardImageElement.setAttribute('src', image)
    parent.style.padding = 0
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
function flipHoleCard(image) {
    const cardElement = document.querySelectorAll('.cards img')[0]
    cardElement.setAttribute('src', image)
}

function setInitalImages() {
    dealer.cards[0].backsideImage = 'images/card-backside.png'
    userCardImage(user.cards[0].image)
    userCardImage(user.cards[1].image)
    dealerCardImage(dealer.cards[0].backsideImage)
    dealerCardImage(dealer.cards[1].image)
}

//-------------------------------------
//-------SET AND DISPLAY SCORES--------
//-------------------------------------
function setScore(player) {
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

function getScore(player) {
    return player.score
}

// use to display dealer score when only one card is shown
function setInitialDealerScore() {
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
    return score
}

function displayScore(score, element) {
    element.innerText = 'Score: ' + score
}


//-------------------------------------
//----------WINNER'S MESSAGE-----------
//-------------------------------------
function setMessage(message, alertClass) {
    const parent = document.querySelectorAll('.message')[0]
    let messageElement = document.createElement('div')
    messageElement.setAttribute('class', alertClass)
    messageElement.innerText = message
    parent.appendChild(messageElement)
}

function resetMessage() {
    setMessage('', 'message')
    const parent = document.querySelectorAll('.message')[0]
    let alertElement = parent.querySelectorAll('div')
    for (let i = 0; i < alertElement.length; i++) {
        parent.removeChild(alertElement[i])
    }
}

//-------------------------------------
//-----------DEALER MOVES--------------
//-------------------------------------
function dealerDraws() {
    for (let i = 0; i < 5; i++) {
        if (user.score <= 21 && user.score > dealer.score && dealer.score < 19) {
            drawCard(dealer)
            let index = dealer.cards.length - 1
            dealerCardImage(dealer.cards[index].image)
            setScore(dealer)
        }
        displayScore(getScore(dealer), document.querySelectorAll('.score')[0])
    }
}

//-------------------------------------
//-------SCORING AND RESULTS-----------
//-------------------------------------
function checkForBust(score) {
    if (score > 21) {
        flipHoleCard(dealer.cards[0].image)
        dealerDraws()
        setMessage('You busted! The dealer wins!', 'alert alert-danger')
        displayWins(dealer.name, dealer.wins, document.querySelectorAll('.player-wins')[1])
        dealBtn.disabled = false
        hitBtn.disabled = true
        standBtn.disabled = true
        return true
    }
    return false
}

function checkForBlackjack(player) {
    if (player.score === 21) {
        document.querySelectorAll('.blackjack-message')[0].innerText = 'Blackjack!'
    }
}

function displayWins(player, wins, element) {
    element.innerText = player + ': ' + wins
}

function compareScores() {
    checkForBlackjack(user)
    checkForBlackjack(dealer)
    if (dealer.score <= 21) {
        if (user.score <= 21 && user.score > dealer.score) {
            user.wins++
            setMessage('You win, congrats!', 'alert alert-success')
            displayWins(user.name, user.wins, document.querySelectorAll('.player-wins')[0])
        } else if (dealer.score === user.score) {
            user.pushes++
            setMessage("It's a push!", 'alert alert-warning')
            displayWins(user.push, user.pushes, document.querySelectorAll('.player-wins')[2])
        } else {
            dealer.wins++
            setMessage('The dealer wins!', 'alert alert-danger')
            displayWins(dealer.name, dealer.wins, document.querySelectorAll('.player-wins')[1])
        }
    } else {
        if (user.score <= 21) {
            user.wins++
            setMessage('The dealer busted! You win!', 'alert alert-success')
            displayWins(user.name, user.wins, document.querySelectorAll('.player-wins')[0])
        }
    }
}

//-------------------------------------
//----------Button functinos-----------
//-------------------------------------
function deal() {
    newGame()
    dealCards()
    setInitalImages()

    setScore(dealer)
    setScore(user)

    displayScore(getScore(user), document.querySelectorAll('.score')[1])
    displayScore(setInitialDealerScore(), document.querySelectorAll('.score')[0])

    dealBtn.disabled = true
    hitBtn.disabled = false
    standBtn.disabled = false
}

function hit() {
    drawCard(user)
    setScore(user)

    let index = user.cards.length - 1
    userCardImage(user.cards[index].image)
    displayScore(getScore(user), document.querySelectorAll('.score')[1])

    checkForBlackjack(user.score, dealer.score)
    checkForBust(user.score)
}

function stand() {
    flipHoleCard(dealer.cards[0].image)
    dealerDraws()
    compareScores()
    dealBtn.disabled = false
    hitBtn.disabled = true
    standBtn.disabled = true
}

//-------------------------------------
//-------BUTTON EVENT HANDLING---------
//-------------------------------------
dealBtn.addEventListener('click', deal)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)