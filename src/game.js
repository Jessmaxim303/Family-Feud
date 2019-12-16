class Game {
  constructor() {
    this.player1 = {};
    this.player2 = {};
    this.scoreboard  = [];
    this.round = {};
    this.roundCount = 0; // might not need 
  }

  returnWinner() {
    if(player1.score > player2.score) {
      return this.player1;
    } else {
      return this.player2;
    }
  }

  fastMoney() {

  }

  createRound() {

  }

  createPlayers() {
    this.player1 = new Player(name);
    this.player2 = new Player(name);
  }
}


export default Game;
