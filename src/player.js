class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.guessCount = 0;
    this.incorrectGuessCount = 0;
  }

  updateScore(respondents) {
    this.score += respondents;
  }

  endGame() {
    
  }
}

export default Player;
