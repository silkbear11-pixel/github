"use strict";

const myForm = document.querySelector("form");
const inputPage = document.querySelector(".frame");
const outputPage = document.querySelector(".output");

myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  inputPage.classList.add("hidden");
  outputPage.classList.remove("hidden");
});
