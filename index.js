let hasBlackJack=false
let isAlive=false
let foundanace=false
let message=""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
let sum = 0
let cards=[]
const suits = ["C","S","D","H"]

let playername="Player"
let playerchips=200

let player ={
    name: "Player",
    chips: 200
}

playerEl.textContent=""



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
            isAlive = false
            console.log ("diabling button")
            document.getElementById("newcard-el").disabled = true;    
        }
    }


    sumEl.textContent="Sum: " + sum

    // Dealer message
    messageEl.textContent = message
}

function newCard(){
    console.log("Drawing a new card from the deck.")
    let card = getRandomCard()
    cards.push(card)   
    renderGame()
}

function startGame(){
    playerEl.textContent = player.name + ": " + "$" + player.chips
    isAlive = true
    hasBlackJack = false
    sum = 0
    cards=[]
    cardsEl.innerHTML =""
    cards.push(getRandomCard(),getRandomCard())
    //sum = cards[0].value + cards[1].value
    document.getElementById("newcard-el").disabled = false;
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

