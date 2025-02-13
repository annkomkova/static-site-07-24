/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

console.clear();
document.addEventListener('DOMContentLoaded', function () {
  searchElem();
  randomWord();
  styleOnClick();
});
function searchElem() {
  var headerTag = document.querySelector('h1');
  var headerClass = document.querySelector('.header');
  var headerID = document.querySelector('#header');
  var headers = document.querySelectorAll('h1');
  headers.forEach(function (header) {
    header.addEventListener('click', function () {
      header.innerHTML = '<span>Клик</span>';
    });
  });
}
function randomWord() {
  var words = ['весёлый', 'грустный', 'диван', 'чебурек', '4', 'кроссовок New Balance', 'спать', 'не спать', 'стол', 'работяга', 'мамин симпатяга'];
  var span = document.querySelector('.random span');
  var button = document.querySelector('.random button');
  button.addEventListener('click', function () {
    var index = Math.floor(words.length * Math.random());
    span.innerHTML = words[index];
  });
}
function styleOnClick() {
  var circle = document.querySelector('.style div');
  var button = document.querySelector('.style button');
  var counter = 0;
  button.addEventListener('click', function () {
    counter++;
    console.log(counter);
    if (counter % 10 == 0) {
      circle.classList.add('coral');
    } else {
      circle.classList.remove('coral');
    }
  });
}
/******/ })()
;