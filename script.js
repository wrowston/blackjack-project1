const cardValue = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'Ace']
const cardSuit = ['hearts', 'spades', 'clubs', 'diamonds']
let deck = []

for (let i = 0; i < cardSuit.length; i++) {
    for (let j = 0; j < cardValue.length; j++) {
        let card = {}
        card.value = cardValue[j]
        card.suit = cardSuit[i]
        card.image = `card-images/${cardValue[j]}_of_${cardSuit[i]}.png`
        deck.push(card)
    }
}
console.log(deck[17].image)
console.log(deck)

let cardElement = document.createElement('img')
cardElement.setAttribute('src', deck[17].image)
document.body.appendChild(cardElement)

