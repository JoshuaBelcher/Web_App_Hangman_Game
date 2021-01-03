import Hangman from './hangman'
import getPuzzle from './requests'

// creates display space in browser for the masked word and the number of remaining guesses

const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')

//establish variable for the game session instance itself

let game1 

//every keypress by the player causes the following:
//1. keystroke is converted to a character code, then saved under the variable as a string value
//2. if current game status is "playing" the listener guessing function is called passing in the value, otherwise, nothing further executes
//3. game text and remaining guess counts are updated in the browser display by re-rendering
//4. Render function blanks the HTML content of the puzzleEl, updates the remaining guesses count display
//   then splits the puzzle string into an array of individual letters. It then creates a new span element
//   for each letter and appends them all to the puzzleEl's HTML

window.addEventListener('keypress', (e) => {
    if (game1.status === 'playing') {
        const guess = String.fromCharCode(e.charCode)
        game1.makeGuess(guess)
        render()
    } 
})

//game1.puzzle -> "*** co**"
//1. for each character in the string, add a span into #puzzle
//2. the span's text should just be the letter itself
const render = () => {
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.statusMessage

    game1.puzzle.split('').forEach((element) => {
        const letterEl = document.createElement("span")
        letterEl.textContent = element
        puzzleEl.appendChild(letterEl)
    })
    
}

// function to start a game session by sending request for puzzle data then instantiating a new Hangman object using that data
// along with the number of allowed guesses
const startGame = async () => {
    const puzzle = await getPuzzle('1')
    game1 = new Hangman(puzzle, 5)
    render()
}

// code for reset button (starts a new game on click)
document.querySelector('#reset').addEventListener('click', startGame)

startGame()