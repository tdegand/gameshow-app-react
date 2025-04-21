import Phrase from './Phrase'; // Assuming Phrase is another module
import phrasesData from '../data/phrase.json';

class Game {
    // Define the properties here
    missed: number;
    phrases: Phrase[];
    activePhrase: Phrase | null;

    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {
        return phrasesData.map((phrase: string) => new Phrase(phrase));
    }

    /**
    * Selects random phrase from phrases property
    * @return {Object} Phrase object chosen to be used
    */
    getRandomPhrase() {
        return this.phrases[Math.floor(Math.random() * this.phrases.length)];
    };
    /**
    * Begins game by selecting a random phrase and displaying it to user
    */
    startGame() {
        this.resetGame();
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        this.activePhrase = this.getRandomPhrase()
        this.activePhrase.addPhraseToDisplay();
        return this.activePhrase;
    };
    /**
    * Checks for winning move
    * @return {boolean} True if game has been won, false if game wasn't
    won
    */
    checkForWin() {
        const letters = document.querySelectorAll('.letter');
        const hidden = document.querySelectorAll('.hide').length;
        for (let i = 0; i < letters.length; i++) {
            if (hidden > 0) {
                return false;
            }
        }
        return true;
    };
    /**
    * Increases the value of the missed property
    * Removes a life from the scoreboard
    * Checks if player has remaining lives and ends game if player is out
    */
    removeLife() {
        const removeHeart = document.querySelectorAll('img')

        if (this.missed === 0) {
            removeHeart[0].src = '../icons/lostHeart.png';
            this.missed++
        } else if (this.missed === 1) {
            removeHeart[1].src = '../icons/lostHeart.png';
            this.missed++
        } else if (this.missed === 2) {
            removeHeart[2].src = '../icons/lostHeart.png';
            this.missed++
        } else if (this.missed === 3) {
            removeHeart[3].src = '../icons/lostHeart.png';
            this.missed++
        } else if (this.missed === 4) {
            removeHeart[4].src = '../icons/lostHeart.png';
            this.missed++
        }

        if (this.missed === 5) {
            return this.gameOver();
        }
    };
    /**
    * Displays game over message if user lost
    * Displays you won message if user wins!
    */
    gameOver() {
        const overlay = document.querySelector('#overlay');
        const message = document.querySelector('#game-over-message');
        const button = document.querySelector('#btn__reset');
        if (overlay) {
            (overlay as HTMLElement).style.display = '';
        }

        if (this.checkForWin()) {
            if (overlay) {
                overlay.className = 'win';
            }
            if (message) {
                message.innerHTML = 'You Won!';
            }
            if (button) {
                button.innerHTML = 'Start New Game';
            }
        } else {
            if (overlay) {
                overlay.className = 'lose';
            }
            if (message) {
                message.innerHTML = 'You lost!';
            }
            if (button) {
                button.innerHTML = 'Start New Game';
            }
        }
    };

    /**
    * Handles onscreen keyboard button clicks
    * @param (HTMLButtonElement) button - The clicked button element
    */
    handleInteraction(button: HTMLButtonElement): void {
        button.disabled = true;

        if (this.activePhrase && this.activePhrase.checkLetter(button.innerHTML) === false) {
            button.classList.add('wrong');
            this.removeLife();
        } else if (this.activePhrase) {
            button.classList.add('chosen');
            this.activePhrase.showMatchedLetter(button.innerHTML);
            if (this.checkForWin() === true) {
                this.gameOver();
            }
        }
    };
    /**
     * This will reset the HTMl elements back to default
     * letter list is emptied
     * key buttons are set back to default
     * Hearts are set back to default
     */
    resetGame() {
        const phraseList = document.querySelector('#phrase ul');
        if (phraseList) {
            phraseList.innerHTML = '';
        }

        const keyButton = document.querySelectorAll('.keyrow button');
        for (let i = 0; i < keyButton.length; i++) {
            const button = keyButton[i] as HTMLButtonElement;
            button.disabled = false;
            button.classList.remove('wrong');
            button.classList.remove('chosen');
        }

        const scoreboard = document.querySelectorAll('.tries img')
        this.missed = 0;
        for (let i = 0; i < scoreboard.length; i++) {
            (scoreboard[i] as HTMLImageElement).src = '../icons/liveHeart.png';
        }
    };
}

export default Game;