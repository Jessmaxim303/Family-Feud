import $ from 'jquery';

import './css/base.scss';

import Game from "./game";
import Round from "./round";
import Player from "./player";

const showGameBoard = () => {
  if ($(".main_p1-log").val() && $(".main_p2-log").val()) {
    $(".main_login").hide();
    $(".main_section").show();
    $(".p1_name").text("Rick '" + $(".main_p1-log").val() + "' Sanchez");
    $(".p2_name").text("Morty '" + $(".main_p2-log").val() + "' Smith");
  };
};

$(".main-login-submit").click(showGameBoard);

const startGame = (data) => {
  const game = new Game(data)
  game.createPlayers()
  let round = game.createRound(data)
  $(".main_question-section").text(round.randomSurveyQuestion()[0].question)
  round.getAnswerById().forEach(answer => {
    $(".main_answer-section").append(
      `<section id="${answer.surveyId}" class="answer_container">
            <h3 class="answer_container-text">${answer.answer}</h3>
            <h3 class="answer_container-text">${answer.respondents}</h3>
       </section>`);
  });
}

const getGuess = (guess) => {
  console.log('workin');
  if(typeof round.checkQuestion(guess) === 'number') {
    console.log('workin right');
    //grab the id on the dom and apply new class
    $(`#${round.checkQuestion(guess)}`).addClass("flip_answer");
  };
};

const receiveData = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data")
    .then(response => response.json())
    .then(data => startGame(data.data))
}

receiveData()

startGame();
$(".p2_guess-button").click(getGuess($(".p2_guess-input").val()));
$(".main-login-submit").click(showGameBoard);
