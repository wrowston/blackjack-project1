// Blackjack Web Application
//--------------------------
// Created by Will Rowston
// Date 04/14/2020

const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
const cardSuit = ['hearts', 'spades', 'clubs', 'diamonds']
let deck = []
let user = {
    name: 'User',
    cards: [],
    score: 0,
    wins: 0,
    cash: 2500,
    currentBet: 0,
    pushes: 0,
    push: 'Push'
}
let dealer = {
    name: 'Dealer',
    cards: [],
    score: 0,
    wins: 0
}

//-------------------------------------
//--------------BUTTONS----------------
//-------------------------------------
const dealBtn = document.querySelectorAll('.deal')[0]
const hitBtn = document.querySelectorAll('.hit')[0]
const standBtn = document.querySelectorAll('.stand')[0]
hitBtn.disabled = true
standBtn.disabled = true

const oneBtn = document.querySelectorAll('.one')[0]
const fiveBtn = document.querySelectorAll('.five')[0]
const tenBtn = document.querySelectorAll('.ten')[0]
const oneHundredBtn = document.querySelectorAll('.one-hundred')[0]
const fiveHundredBtn = document.querySelectorAll('.five-hundred')[0]

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
    displayCash()
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
    // return player.score
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
        displayScore(dealer.score, document.querySelectorAll('.score')[0])
    }
}

//-------------------------------------
//----------Gambling functinos---------
//-------------------------------------
function displayCash() {
    const cash = document.querySelectorAll('.cash')[0]
    cash.innerText = 'Available Cash: $' + user.cash
}
displayCash()

function placeBet(amount) {
    const currentBet = document.querySelectorAll('.current-bet')[0]
    user.currentBet += amount
    if (amount <= user.cash) {
        currentBet.innerText = 'Current Bet: $' + user.currentBet
        user.cash -= amount
        if (user.cash === 0) {
            disableGambling()
        }
    }
}

function resetBet() {
    const currentBet = document.querySelectorAll('.current-bet')[0]
    user.currentBet = 0
    currentBet.innerText = 'Current Bet: $' + user.currentBet
}
resetBet()

function loseBet() {
    resetBet()
    displayCash()
}

function winBet() {
    if (checkForBlackjack(user)) {
        user.cash += ((user.currentBet * 2) + (user.currentBet / 2))
    } else {
        user.cash += (user.currentBet * 2)
    }
    resetBet()
    displayCash()
}

function pushBet() {
    user.cash += user.currentBet
    resetBet()
    displayCash()
}

//-------------------------------------
//-------SCORING AND RESULTS-----------
//-------------------------------------
function checkForBlackjack(player) {
    // Blackjack = an Ace and a card witha value of 10
    if (player.score === 21) {
        if (player.cards[0].value === 'ace') {
            if (player.cards[1].value === '10' ||
                player.cards[1].value === 'jack' ||
                player.cards[1].value === 'queen' ||
                player.cards[1].value === 'king') {
                return true
            }
        } else if (player.cards[0].value === '10' ||
            player.cards[0].value === 'jack' ||
            player.cards[0].value === 'queen' ||
            player.cards[0].value === 'king') {
            if (player.cards[1].value === 'ace') {
                return true
            }
        }
    }
    return false
}

function displayWins(player, wins, element) {
    element.innerText = player + ': ' + wins
}

function compareScores() {
    // IF DEALER AND USER HAVE DIFFERENET SCORES
    if (user.score !== dealer.score) {
        // User has blackjack and dealer doesn't have blackjack
        if (checkForBlackjack(user)) {
            user.wins++
            setMessage("You win with Blackjack!", "alert alert-success")
            displayWins(user.name, user.wins, document.querySelectorAll('.player-wins')[0])
            winBet()
        }
        // Dealer has blackjack and user doesn't have blackjack
        else if (checkForBlackjack(dealer)) {
            dealer.wins++
            setMessage("The dealer wins with Blackjack!", "alert alert-danger")
            displayWins(dealer.name, dealer.wins, document.querySelectorAll('.player-wins')[1])
            loseBet()
        }
        // User has score less than 22 and higher than dealer
        else if (user.score <= 21 && user.score > dealer.score) {
            user.wins++
            setMessage('You win, congrats!', 'alert alert-success')
            displayWins(user.name, user.wins, document.querySelectorAll('.player-wins')[0])
            winBet()
        }
        // Dealer has higher score than user and did not bust
        else if (dealer.score <= 21 && dealer.score > user.score) {
            dealer.wins++
            setMessage('The dealer wins!', 'alert alert-danger')
            displayWins(dealer.name, dealer.wins, document.querySelectorAll('.player-wins')[1])
            loseBet()
        }
    }
    // IF DEALER AND USER HAVE THE SAME SCORE
    else if (dealer.score === user.score) {
        // Dealer and user have the same score and neither have blackjack
        if (!checkForBlackjack(user) && !checkForBlackjack(dealer)) {
            user.pushes++
            setMessage("It's a push!", 'alert alert-warning')
            displayWins(user.push, user.pushes, document.querySelectorAll('.player-wins')[2])
            pushBet()
        }
        // Dealer and user both have 21 but user has blackjack
        else if (checkForBlackjack(user)) {
            user.wins++
            setMessage("You win with Blackjack!", "alert alert-success")
            displayWins(user.name, user.wins, document.querySelectorAll('.player-wins')[0])
            winBet()
        }
        // Dealer and user both have 21 but dealer has blackjack
        else if (checkForBlackjack(dealer)) {
            dealer.wins++
            setMessage("The dealer wins with Blackjack!", "alert alert-danger")
            displayWins(dealer.name, dealer.wins, document.querySelectorAll('.player-wins')[1])
            loseBet()
        }
    }
    // Dealer busted and the user has a score less than 22
    if (dealer.score > 21 && user.score <= 21 && !checkForBlackjack(user)) {
        user.wins++
        setMessage('The dealer busted! You win!', 'alert alert-success')
        displayWins(user.name, user.wins, document.querySelectorAll('.player-wins')[0])
        winBet()
    }

}

//-------------------------------------
//----------BUTTON FUNCTIONS-----------
//-------------------------------------
function deal() {
    newGame()
    dealCards()
    setInitalImages()

    setScore(dealer)
    setScore(user)

    displayScore(user.score, document.querySelectorAll('.score')[1])
    displayScore(setInitialDealerScore(), document.querySelectorAll('.score')[0])

    dealBtn.disabled = true
    hitBtn.disabled = false
    standBtn.disabled = false
    disableGambling()
}

function hit() {
    drawCard(user)
    setScore(user)

    let index = user.cards.length - 1
    userCardImage(user.cards[index].image)
    displayScore(user.score, document.querySelectorAll('.score')[1])

    if (user.score > 21) {
        dealer.wins++
        setMessage('You busted! The dealer wins!', 'alert alert-danger')
        displayWins(dealer.name, dealer.wins, document.querySelectorAll('.player-wins')[1])
        loseBet()
        flipHoleCard(dealer.cards[0].image)
        dealerDraws()
        dealBtn.disabled = false
        hitBtn.disabled = true
        standBtn.disabled = true
        enableGambling()
    }
}

function stand() {
    flipHoleCard(dealer.cards[0].image)
    dealerDraws()
    compareScores()
    dealBtn.disabled = false
    hitBtn.disabled = true
    standBtn.disabled = true
    enableGambling()
}

//-------------------------------------
//-------BUTTON EVENT HANDLING---------
//-------------------------------------
dealBtn.addEventListener('click', deal)
hitBtn.addEventListener('click', hit)
standBtn.addEventListener('click', stand)


//-------------------------------------
//-----------GAMBLING BUTTONS----------
//-------------------------------------
function disableGambling() {
    oneBtn.disabled = true
    fiveBtn.disabled = true
    tenBtn.disabled = true
    oneHundredBtn.disabled = true
    fiveHundredBtn.disabled = true
}

function enableGambling() {
    oneBtn.disabled = false
    fiveBtn.disabled = false
    tenBtn.disabled = false
    oneHundredBtn.disabled = false
    fiveHundredBtn.disabled = false
}

oneBtn.addEventListener('click', () => {
    placeBet(1)
    displayCash()
})
fiveBtn.addEventListener('click', () => {
    placeBet(5)
    displayCash()

})
tenBtn.addEventListener('click', () => {
    placeBet(10)
    displayCash()
})
oneHundredBtn.addEventListener('click', () => {
    placeBet(100)
    displayCash()
})
fiveHundredBtn.addEventListener('click', () => {
    placeBet(500)
    displayCash()
})
