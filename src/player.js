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
}

export default Player;
