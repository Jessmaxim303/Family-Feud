import $ from 'jquery';

import './css/base.scss';

import Game from "./game";
import Round from "./round";
import Player from "./player";

$(".main_section").hide();

const showGameBoard = () => {
  if ($(".main_p1-log").val() && $(".main_p2-log").val()) {
    $(".main_login").hide();
    $(".main_section").show();
    $(".p1_name").text("Rick '" + $(".main_p1-log").val() + "' Sanchez");
    $(".p2_name").text("Morty '" + $(".main_p2-log").val() + "' Smith");
  };
};

const newRound = () => {
  $(".main_answer-section").empty();
  $(".main_question-section").text(round.randomSurveyQuestion()[0].question);
  round.getAnswerById().forEach(answer => {
    $(".main_answer-section").append(
      `<section class="answer_container answer-cover ${answer.answer.toLowerCase().split(' ').join('')}">
            <h3 class="answer_container-text">${answer.answer}</h3>
            <h3 class="answer_container-text answer-score">${answer.respondents}</h3>
       </section>`);
  });
}

$(".main-login-submit").click(showGameBoard);
let round;
let game;
const startGame = (data) => {
  game = new Game(data);
  game.createPlayers();
  round = game.createRound(game.gameData);
  newRound();
}

const getGuess = (guess, player) => {
  game[player].guessCount++;
  if(round.checkQuestion(guess)) {
    $(`.${guess}`).addClass("flip_answer");
    $(`.${guess}`).removeClass("answer-cover");
    game[player].updateScore(round.checkQuestion(guess).respondents);
    $(`.${player}_score-text`).text(`SCORE: ${game[player].score}`)
  } else {
    game[player].incorrectGuessCount++;
    $(`.${player}_strike-${game.player1.incorrectGuessCount}`).removeClass("hidden");
  }
  if(round.activePlayer === game.player1) {
    round.activePlayer = game.player2;
  } else {
    round.activePlayer = game.player1;
  }
  console.log(round.correctGuesses);

  if(round.correctGuesses === 6 || game.player1.incorrectGuessCount === 3 &&game.player2.incorrectGuessCount === 3) {
    newRound();
  }
};

const receiveData = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data")
    .then(response => response.json())
    .then(data => startGame(data.data))
    .catch(error => console.log(error));
}

const sendGuess = () => {
  if($(".p1_guess-input").val()) {
  getGuess($(".p1_guess-input").val().toLowerCase().split(' ').join(''), 'player1');
  } else {
  getGuess($(".p2_guess-input").val().toLowerCase().split(' ').join(''), 'player2');
  }
  
};



receiveData();

$(".p1_guess-button").click(sendGuess);
$(".p2_guess-button").click(sendGuess);
$(".main-login-submit").click(showGameBoard);
