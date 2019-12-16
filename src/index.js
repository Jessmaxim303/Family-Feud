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

// $('.main-login-submit').on('click', function() {
// 	if ($('.main_p1-log').text != '') {
//     window.location = "./index.html";
//   } else {
//     window.location = "./src/player-log.html";
//   }
// })

// $('form input[type!=submit]').each(function(){
//    //If the field's empty
//    if($(this).val() != '')
//    {

window.location = "./src/player-log.html"