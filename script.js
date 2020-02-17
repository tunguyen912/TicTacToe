const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
let circleTurn = false
const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]
const winningMessage = document.querySelector('[winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')


setBoardHover()


cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true })
});


function handleClick(e){

    
    // Place win
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currentClass)
    if(checkWin(currentClass)){
        endGame(false)
        console.log(winningMessageElement)
    }
    switchTurn()
    setBoardHover()

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

    }else{
        winningMessage.innerText = `${circleTurn ? "O's" : "X' s"} Wins !!!!`
    }
    winningMessageElement.classList.add('show')
}