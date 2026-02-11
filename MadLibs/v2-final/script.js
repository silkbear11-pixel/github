(function () {
  "use strict";
  console.log("reading js");

  const myForm = document.querySelector("#myform");
  const madlib = document.querySelector("#madlib");
  const inputPage = document.querySelector("#inputPage");
  const outputPage = document.querySelector("#outputPage");
  const againBtn = document.querySelector("#again");

  myForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const noun1 = document.querySelector("#noun1").value;
    const noun2 = document.querySelector("#noun2").value;
    const noun3 = document.querySelector("#noun3").value;
    const adj1 = document.querySelector("#adj1").value;
    const adj2 = document.querySelector("#adj2").value;
    const verbing = document.querySelector("#verbing").value;
    const place1 = document.querySelector("#place1").value;
    const place2 = document.querySelector("#place2").value;
    const number = document.querySelector("#number").value;

    const myText =
      "On my way to <span class='user-word'>" + place1 + "</span>, I carried my <span class='user-word'>" + noun1 + "</span> and a <span class='user-word'>" + noun2 + "</span> like it was totally normal. " +
      "The day felt <span class='user-word'>" + adj1 + "</span>, but the campus also looked <span class='user-word'>" + adj2 + "</span> for some reason. " +
      "Near the entrance, I saw someone <span class='user-word'>" + verbing + "</span>, and I stopped to watch for <span class='user-word'>" + number + "</span> seconds before remembering I was late. " +
      "By the time I reached <span class='user-word'>" + place2 + "</span>, I was pretending everything was fine, even though my <span class='user-word'>" + noun3 + "</span> was basically falling apart.";

    madlib.innerHTML = myText;

    inputPage.style.display = "none"; /* Edited through feedback from TA Giang Le*/
    outputPage.style.display = "block"; /* Edited through feedback from TA Giang Le */
  });

  againBtn.addEventListener("click", function () {
    inputPage.style.display = "grid"; /* Edited through feedback from TA Giang Le */
    outputPage.style.display = "none"; /* Edited through feedback from TA Giang Le */

    myForm.reset();
    document.querySelector("#noun1").focus();
  });
})();
