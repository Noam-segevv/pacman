'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPERFOOD = '⚬'
var getRandomCherry = setInterval(randomCherry, 5000)

const gGame = {
    score: 0,
    isOn: false
}
var gBoard
var isSUPERFOOD = false


function onInit() {
    console.log('hello')

    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard)
    gGame.isOn = true


}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2) ||
                j === 5 && i > 1 && i < size - 5) {
                board[i][j] = WALL
            }
        }
    }

    board[1][8] = SUPERFOOD
    board[1][1] = SUPERFOOD
    board[8][1] = SUPERFOOD
    board[8][8] = SUPERFOOD
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value

}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    renderCell(gPacman.location, EMPTY)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'

}



function getEmptyCell(board = gBoard) {
    const emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            const currCell = board[i][j];
            if (currCell === EMPTY)
                emptyCells.push({ i, j }) // {i:i,J:J}
        }
    }
    return emptyCells[getRandomIntInclusive(0, emptyCells.length - 1)]
}

function randomCherry() {
    const emptyCell = getEmptyCell()
    if (!emptyCell) return
    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)

}
