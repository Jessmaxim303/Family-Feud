import Player from "./Player";
import Round from "./Round";

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
      return player1;
    } else {
      return this.player2;
    }
  }

  fastMoney() {

  }


  createPlayers() {
    this.player1 = new Player(name);
    this.player2 = new Player(name);
  }

  createRound(data) {
    const round = new Round(data, this.player1, this.player2)
    console.log(round)
    // round.randomSurveyQuestion()
  }

}


export default Game;
