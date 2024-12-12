/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

var swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 5000
  },
  effect: 'fade',
  loop: true,
  pagination: {
    el: '.swiper-pagination'
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar'
  // }
});
/******/ })()
;