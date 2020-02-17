const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let circleTurn
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
const winningMessage = document.querySelector('[winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
const btnRestart = document.getElementById('restartButton')

startGame()
btnRestart.addEventListener('click', startGame)


function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
        // console.log(winningMessageElement)
    }else if(isDraw()){
        endGame(true)
    }else{
        switchTurn()
        setBoardHover()
    }
}


function startGame(){
    circleTurn = false
    setBoardHover()
    // cellElements.forEach(cell => {
    //     cell.addEventListener('click', handleClick, { once: true })
    // });
    winningMessageElement.classList.remove('show')
    cellElements.forEach(cell =>{
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}
function switchTurn(){
    circleTurn = !circleTurn
}
function setBoardHover(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn) board.classList.add(CIRCLE_CLASS)
    else board.classList.add(X_CLASS)
}
function checkWin(currentClass){
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw){
    if(draw){
        winningMessage.innerText = 'Draw !!!'
    }else{
        winningMessage.innerText = `${circleTurn ? "O's" : "X's"} Wins !!!!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    //Destruct cellElements to make it become an array so that we can use every() method
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}