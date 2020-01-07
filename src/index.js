import $ from 'jquery';

import './css/base.scss';

import Game from "./game";
import Round from "./round";
import Player from "./player";

$(".main_section").hide();

let round;
let game;

const showGameBoard = () => {
  if ($(".main_player1-log").val() && $(".main_player2-log").val()) {
    $(".main_login").hide();
    $(".main_section").show();
    $(".p1_name").text("Rick '" + $(".main_player1-log").val() + "' Sanchez");
    $(".p2_name").text("Morty '" + $(".main_player2-log").val() + "' Smith");
  };
};

const resetGuesses = () => {
  round.correctGuesses = 0;
  game.player1.incorrectGuessCount = 0;
  game.player2.incorrectGuessCount = 0;
}

const removeXs = () => {
  if(!$(".player1_strike-1").hasClass("hidden")) {
    $(".player1_strike-1").addClass("hidden");
  }
  if(!$(".player1_strike-2").hasClass("hidden")) {
    $(".player1_strike-2").addClass("hidden");
  }
  if(!$(".player1_strike-3").hasClass("hidden")) {
    $(".player1_strike-3").addClass("hidden");
  }
  if(!$(".player2_strike-1").hasClass("hidden")) {
    $(".player2_strike-1").addClass("hidden");
  }
  if(!$(".player2_strike-2").hasClass("hidden")) {
    $(".player2_strike-2").addClass("hidden");
  }
  if(!$(".player2_strike-3").hasClass("hidden")) {
    $(".player2_strike-3").addClass("hidden");
  }
}

const getScoreBoardData = () => {
  fetch("http://fe-apps.herokuapp.com/api/v1/gametime/leaderboard")
   .then(response => response.json())
   .then(data => showScoreBoard(data))
   .catch(error => console.log(error));
}

const showScoreBoard = (scores) => {
  let highScores = scores.highScore.find(score => score.appId === "1909knthjm");
  console.log(highScores);
}

const postWinner = (player) => {
  fetch("http://fe-apps.herokuapp.com/api/v1/gametime/leaderboard", {
    method: "POST",
    headers: {"Content-Type": "Application/JSON"},
    body: JSON.stringify({
      appId: "1909knthjm",
      playerName: `${$(".main_" + player + "-log").val()}`,
      playerScore: `${game.getPlayerScore(player)}`
    })
  })
}

const showHighScores = () => {
  $(".main_answer-section")
}

const newRound = () => {
  game.roundCount++;
  let answerSection = $(".main_answer-section")
  answerSection.empty();
  $(".main_question-section").empty();
  console.log(round.survey);
  if(round.survey.length <= 0) {
    if(game.player1.score > game.player2.score) {
      $(".main_question-section").text(`Game Over, ${$(".main_player1-log").val()} wins with ${game.player1.score} points`);
      postWinner("player1");
    } else {
      answerSection.text(`GAME OVER, ${$(".main_player2-log").val()} wins with ${game.player2.score} points.`);
      postWinner("player2");
    }
  }
  $(".main_question-section").text(round.randomSurveyQuestion().question);
  round.getAnswerById().forEach(answer => {
    $(".main_answer-section").append(
      `<section class="answer_container answer-cover ${answer.answer.toLowerCase().split(' ').join('')}">
            <h3 class="answer_container-text">${answer.answer}</h3>
            <h3 class="answer_container-text answer-score">${answer.respondents}</h3>
       </section>`);
  });
  resetGuesses();
  removeXs();
  round.removeSurvey();
}

$(".main-login-submit").click(showGameBoard);

const startGame = (data) => {
  game = new Game(data);
  game.createPlayers();
  round = game.createRound(game.gameData);
  newRound();
}

const evaluateTurn = (player) => {
  const player1Input = $(".p1_guess-input");
  const player1Button = $(".p1_guess-button");
  const player2Input = $(".p2_guess-input");
  const player2Button = $(".p2_guess-button");
  if(player === 'player1') {
    player1Input.prop("disabled", true);
    player2Input.prop("disabled", false);
    player1Input.val("");
    player2Button.prop("disabled", false);
    player1Button.prop("disabled", true);
  } else if (player === 'player2') {
    player2Input.prop("disabled", true);
    player1Input.prop("disabled", false);
    player2Input.val("");
    player1Button.prop("disabled", false);
    player2Button.prop("disabled", true);
  }
}

const getGuess = (guess, player) => {
  evaluateTurn(player);
  game[player].guessCount++;
  if(round.checkQuestion(guess)) {
    $(`.${guess}`).addClass("flip_answer");
    $(`.${guess}`).removeClass("answer-cover");
    game[player].updateScore(round.checkQuestion(guess).respondents);
    $(`.${player}_score-text`).text(`SCORE: ${game[player].score}`)
  } else {
    game[player].incorrectGuessCount++;
    console.log(game[player].incorrectGuessCount);
    $(`.${player}_strike-${game.player1.incorrectGuessCount}`).removeClass("hidden");
  }
  if(round.correctGuesses >= 6 ||
    game.player1.incorrectGuessCount >= 3 &&
    game.player2.incorrectGuessCount >= 3) {
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
} else if($(".p2_guess-input").val()) {
  getGuess($(".p2_guess-input").val().toLowerCase().split(' ').join(''), 'player2');
  }

};

receiveData();

$(".p1_guess-button").click(sendGuess);
$(".p2_guess-button").click(sendGuess);
$(".main-login-submit").click(showGameBoard);
// $(".main-highscores-button")