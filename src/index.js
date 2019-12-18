// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you import jQuery into a JS file if you use jQuery in that file
import $ from 'jquery';

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png';
// console.log('This is the JavaScript entry file - your code begins here.');

// import data from "./game-data";
import Game from "./Game";
import Round from "./Round";
import Player from "./Player";

// console.log('This is the JavaScript entry file - your code begins here.');
// console.log(data)
$(".main_login").show();
$(".main_section").hide();

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
