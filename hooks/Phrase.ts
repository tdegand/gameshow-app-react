class Phrase {
  private phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase.toLowerCase();
  }

  /**
   * Returns the phrase as a string
   */
  toString(): string {
    return this.phrase;
  }

  /**
   * Display phrase on game board
   */
  addPhraseToDisplay() {
    const phraseContainer = document.querySelector('#phrase ul');
    if (phraseContainer) {
      phraseContainer.className = 'phrase';
    }

    // Split the phrase into individual letters
    const letters = this.phrase.split('');
    const regex = new RegExp(/[a-z]/);

    /**
     * Compare the letters to the RegEx
     * If those letters match, then add classname of letter
     * If not, then add classname of space
     * Append each new element
     */
    for (const letter of letters) {
      const newListItem = document.createElement('li');
      if (regex.test(letter)) {
        newListItem.className = 'letter hide';
        newListItem.innerHTML = `${letter}`;
      } else {
        newListItem.className = 'space';
      }
      if (phraseContainer) {
        phraseContainer.appendChild(newListItem);
      }
    }
  }

  /**
    * Checks if passed letter is in phrase
    * @param (string) letter - Letter to check
    */
  checkLetter(letter: string): boolean {
    const normalizedLetter = letter.toLowerCase().trim();
    return this.phrase.includes(normalizedLetter);
  }

  /**nvm 
  * Displays passed letter on screen after a match is found
  * @param (string) letter - Letter to display
  */
  showMatchedLetter(letter: string): void {
    const displayedLetters: NodeListOf<HTMLElement> = document.querySelectorAll('.letter');

    for (const item of displayedLetters) {
      const element = item as HTMLElement;
      if (element.classList.contains('letter') && element.innerHTML === letter) {
        element.classList.add('show');
        element.classList.remove('hide');
        element.innerHTML = `${letter}`;
      }
    }
  };
}

export default Phrase;