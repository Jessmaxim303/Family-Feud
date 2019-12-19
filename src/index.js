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
let round;
const startGame = (data) => {
  const game = new Game(data);
  game.createPlayers();
  round = game.createRound(data);
  $(".main_question-section").text(round.randomSurveyQuestion()[0].question);
  round.getAnswerById().forEach(answer => {
    $(".main_answer-section").append(
      `<section id="${answer.surveyId}" class="answer_container ${answer.answer.toLowerCase().split(' ').join('')}">
            <h3 class="answer_container-text">${answer.answer}</h3>
            <h3 class="answer_container-text">${answer.respondents}</h3>
       </section>`);
  });
}

const getGuess = (guess) => {
  if(round.checkQuestion(guess)) {
    $(`.${guess}`).addClass("flip_answer");
  };
};

const receiveData = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data")
    .then(response => response.json())
    .then(data => startGame(data.data))
    .catch(error => console.log(error));
}

const sendGuess = () => {
  getGuess($(".p2_guess-input").val().toLowerCase().split(' ').join(''));
}

receiveData();

$(".p2_guess-button").click(sendGuess);
$(".main-login-submit").click(showGameBoard);
