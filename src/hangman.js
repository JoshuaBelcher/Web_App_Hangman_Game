// creates the Hangman object that will be used to generate each game

class Hangman {
    constructor (word, remainingGuesses) {
    this.word = word.toLowerCase().split('')
    this.remainingGuesses = remainingGuesses
    this.guessedLetters = []
    this.status = 'playing'
    }

    // generates the text content of the game, which will be called when the game is initialized
    // and every time a keystroke entry is made by the player (its result is set to HTML element puzzleEl.textContent)

    get puzzle() {
        let puzzle = ''
    
        this.word.forEach((letter) => {
            if (this.guessedLetters.includes(letter) || letter === ' ') {
                puzzle += letter
            } else {
                puzzle += '*'
            }
        })
        
        return puzzle
    }

    // checks remaining guess count and comparison of word letters to guessed letters to see if player has failed, finished,
    // or is still playing, setting the result as 'status' in the game's Hangman object

    updateStatus() {
        if (this.remainingGuesses === 0) {
            this.status = 'failed'
        } else if (this.word.every ((element) => {
            return this.guessedLetters.includes(element) || element === ' '
        })) {
            this.status = 'finished'
        } else {
            this.status = 'playing'}
    }

    get statusMessage() {
        if (this.status === 'playing'){
            return `Guesses left: ${this.remainingGuesses}`
        } else if (this.status === 'failed'){
            return `Nice try! The word was "${this.word.join("")}"`
        } else {
            return 'Great work! You guessed the word.'
        }
    }

    // allows the player to make a guess by adding the guessed letter to the array under the Hangman object's associated property,
    // but only if it is a letter not already contained in that array. If this letter is not one of the letters in the game's
    // word and has also not been guessed previously, then the number of remaining guesses will be decremented
    
    makeGuess(guess) {
        guess = guess.toLowerCase()
    
        if (this.word.includes(guess) && !this.guessedLetters.includes(guess)) {
            this.guessedLetters.push(guess)
        } else if (!this.guessedLetters.includes(guess)) {
            // this.guessedLetters.push(guess), replaced below with example of spread operator usage
            this.guessedLetters = [guess, ...this.guessedLetters]
            this.remainingGuesses --
        }
    
        this.updateStatus()
        console.log(this.status)
    }
}

export { Hangman as default}