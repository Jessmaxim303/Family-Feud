// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
import './game';
// import './game-data';

import data from "./game-data";
import Game from "./Game";
import Round from "./Round";
import Player from "./Player";

// console.log('This is the JavaScript entry file - your code begins here.');
// console.log(data)
$(".main_login").show();
$(".main_section").hide();

const showGameBoard = () => {
  if ($("main_p1-log").val && $("main_p2-log").val) {
    $(".main_login").hide();
    $(".main_section").show();
    $(".p1_name").text($(".main_p1-log").val());
    $(".p2_name").text($(".main_p2-log").val());
  };
};

$(".main-login-submit").click(showGameBoard);

const receiveData = () => {
  fetch("https://fe-apps.herokuapp.com/api/v1/gametime/1903/family-feud/data")
    .then(data => data.json())
    return data
}

const startGame = () => {
  const game = new Game(data)
  const round = new Round(data)
  game.createPlayers()
  game.createRound(data)
  $(".main_question-section").text(round.randomSurveyQuestion()[0].question)
  round.getAnswerById().forEach(answer => {
    $(".main_answer-section").append(
      `<section class="answer_container">
            <h3>${answer.answer}</h3>
       </section>`);
  });
}

startGame()


