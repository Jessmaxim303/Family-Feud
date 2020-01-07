import Player from "./Player";
import Round from "./Round";
import $ from 'jquery';

class Game {
  constructor(data) {
    this.player1 = {};
    this.player2 = {};
    this.scoreboard  = [];
    this.round = {};
    this.roundCount = 0;
    this.gameData = data;
  }

  getPlayerScore(playerName) {
    if(playerName === "player1") {
      return this.player1.score;
    } else if (playerName === "player2") {
      return this.player2.score;
    }
  }

  returnWinner() {
    if(this.player1.score > this.player2.score) {
      return `${this.player1} is the winner, with ${this.player1.score} points!`;
    } else {
      return `${this.player2} is the winner, with ${this.player2.score} points!`;
    }
  }

  fastMoney() {

  }

  createPlayers() {
    this.player1 = new Player($('.main_player1-log').val());
    this.player2 = new Player($('.main_player2-log').val());
  }

  createRound(data) {
    const round = new Round(data, this.player1, this.player2);
    return round;
  }

  saveToLocal() {
    let highScore = JSON.stringify(this.scoreboard );
    global.localStorage.setItem('high Score', highScore);
  }

}


export default Game;
