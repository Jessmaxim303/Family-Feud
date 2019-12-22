import Player from "./Player";
import Round from "./Round";
import $ from 'jquery';

class Game {
  constructor(data) {
    this.player1 = {};
    this.player2 = {};
    this.scoreboard  = [];
    this.round = {};
    this.roundCount = 0; // might not need 
    this.gameData = data;
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
    this.player1 = new Player($('.main_p1-log').val());
    this.player2 = new Player($('.main_p2-log').val());
  }

  createRound(data) {
    const round = new Round(data, this.player1, this.player2);
    return round;
  }



}


export default Game;
