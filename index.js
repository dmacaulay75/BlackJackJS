// A bunch of comments

let hasBlackJack=false
let isAlive=false
let foundanace=false
let message=""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")
let dealerCardsEl = document.getElementById("dealercards-el")
let newCardEl = document.getElementById("newcard-el")
let stickEl = document.getElementById("stick-el")
let winnerEl = document.getElementById("winner-el")

let sum = 0
let cards=[]
let dealerCards=[]
let dealerCount=0
let playerCount=0

const suits = ["C","S","D","H"]

let playername="Player"
let playerchips=200

let player ={
    name: "Player",
    chips: 200
}

playerEl.textContent=""

function startGame(){
    newCardEl.hidden = false
    stickEl.hidden = false
    dealerEl.hidden = false
    playerEl.hidden = false
    sumEl.hidden = false
    playerEl.hidden = false
    playerEl.textContent = player.name + ": " + "$" + player.chips
    winnerEl.textContent = ""
    isAlive = true
    hasBlackJack = false
    sum = 0
    cards=[]
    cardsEl.innerHTML =""
    playerCount=0

    cards.push(getRandomCard(),getRandomCard())
    document.getElementById("newcard-el").disabled = false;
    renderGame()
}

function renderGame(){
console.clear()

    cardsEl.innerHTML =""
    let filename=""
    let filenamesuit=""
    let filenamevalue=""
    foundanace=false

    // Display cards
    for(let i = 0; i < cards.length; i++)
    {
        if (cards[i].name === "A"){filenamevalue="ace"}
        else if (cards[i].name === "J"){filenamevalue="jack"}
        else if (cards[i].name === "Q"){filenamevalue="queen"}
        else if (cards[i].name === "K"){filenamevalue="king"}
        else {filenamevalue=cards[i].value}

        if (cards[i].suit === "S") {filenamesuit="spades"}
        if (cards[i].suit === "C") {filenamesuit="clubs"}
        if (cards[i].suit === "D") {filenamesuit="diamonds"}
        if (cards[i].suit === "H") {filenamesuit="hearts"}
        
        filename = "images/" + filenamesuit + "_" + filenamevalue + ".png"

        console.log(cards[i])

        //cardsEl.textContent += cards[i].name + cards[i].suit + " "
        cardsEl.innerHTML += '<img src="'+ filename + '" id=cardimg alt="' +  cards[i].name + cards[i].suit + '" width="150" height="210" margin="15">'
    }

    
    console.log(sum)
   
    // Display sum
    //sumEl.textContent="Sum: " + sum

    // Logic
    if(sum <= 20){
        message = "Draw?"    
    } else if (sum === 21){
        message = "Blackack!"
        hasBlackJack = true
        console.log ("diabling button")
        document.getElementById("newcard-el").disabled = true;
        winnerEl.textContent = "Player wins!"
    }else { // is there an ace I can rurn into a 1
        for(let i = 0; i < cards.length; i++)
        {
            if (cards[i].name === "A" && cards[i].gonewild === false)
            {
                cards[i].value = 1
                cards[i].gonewild=true
                sum = sum - 10
                console.log("Found an ace")
                foundanace=true
            }          
        }
        if (foundanace === false)
        {
            message = "Bust!"
            winnerEl.textContent = "Dealer wins!"
            isAlive = false
            console.log ("diabling button")
            document.getElementById("newcard-el").disabled = true;    
        }
    }


    sumEl.textContent="Sum: " + sum

    // Dealer message
    messageEl.textContent = message

    //render dealer cards
    dealerCardsEl.innerHTML = '<img src="images/back.png" width="75" height="105" margin="15"><img src="images/back.png" width="75" height="105" margin="15">'

}

function newCard(){
    console.log("Drawing a new card from the deck.")
    let card = getRandomCard()
    cards.push(card)   
    renderGame()
}

function getRandomCard(){
    let randsuit=Math.floor(Math.random() * 3)
    let randcard=Math.floor(Math.random() * 13) + 1
    let cardobj = {
        value: randcard,
        suit: suits[randsuit],
        name: randcard,
        gonewild: false
    }

    if (cardobj.value === 1) {cardobj.name="A"; cardobj.value=11}
    else if (cardobj.value === 11) {cardobj.name="J"; cardobj.value=10}
    else if (cardobj.value === 12) {cardobj.name="Q"; cardobj.value=10}
    else if (cardobj.value === 13) {cardobj.name="K"; cardobj.value=10}  

    sum += cardobj.value
    
    return cardobj
}

function Stick(){
    playerCount = sum
    dealerCards=[]
    dealerCount=0
    console.log("Stick")
    console.log("Sticking with - " + sum)
    dealerCards.push(getRandomCard(),getRandomCard())
    console.log(dealerCards)

    dealerCardsEl.innerHTML = ""
    renderDealerCards()
}

function renderDealerCards() {
    for(let i = 0; i < dealerCards.length; i++)
    {
        if (dealerCards[i].name === "A"){filenamevalue="ace"}
        else if (dealerCards[i].name === "J"){filenamevalue="jack"}
        else if (dealerCards[i].name === "Q"){filenamevalue="queen"}
        else if (dealerCards[i].name === "K"){filenamevalue="king"}
        else {filenamevalue=dealerCards[i].value}

        if (dealerCards[i].suit === "S") {filenamesuit="spades"}
        if (dealerCards[i].suit === "C") {filenamesuit="clubs"}
        if (dealerCards[i].suit === "D") {filenamesuit="diamonds"}
        if (dealerCards[i].suit === "H") {filenamesuit="hearts"}
        
        filename = "images/" + filenamesuit + "_" + filenamevalue + ".png"

        //cardsEl.textContent += cards[i].name + cards[i].suit + " "
        dealerCardsEl.innerHTML += '<img src="'+ filename + '" id=cardimg alt="' +  dealerCards[i].name + dealerCards[i].suit + '" width="75" height="105" margin="15">'
        dealerEval()
    }
}

function dealerEval(){
    dealerCount=0
    console.log(dealerCards)
    for(let i = 0; i < dealerCards.length; i++) 
    {
        dealerCount+=dealerCards[i].value
    }
    console.log("Dealer Count - " + dealerCount)

    if (dealerCount > 16 || dealerCount > playerCount){
        console.log("Dealer sticks")
        //dealerStick()
    }
    else {
        console.log("Dealer draws")
        dealerCards.push(getRandomCard())
        dealerEval()
    }

    console.log("Dealer - " + dealerCount)
    console.log("Player - " + playerCount)

    if (dealerCount > playerCount && dealerCount < 22)
    {
        winnerEl.textContent = "Dealer wins!"
    } else {
        winnerEl.textContent = "Player wins!"
    }
    
}

