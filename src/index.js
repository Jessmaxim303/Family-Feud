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


// console.log('This is the JavaScript entry file - your code begins here.');
console.log(data)
$(".main_login").show();
$(".main_section").hide();

// $(".main_login").hide();
// $(".main_section").show();

$("main-login-submit").click(showGameBoard);

const showGameBoard = () => {
  if ($("1_guess-input").val && $("2_guess-input").val) {
    $(".main_section").show();
  };
};