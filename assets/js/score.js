
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
var highScorePrint = document.querySelector(".scoresHTML");
var clearHighScore = document.getElementById("clearScores");

console.log(highscores)
console.log(highScorePrint)
console.log(clearHighScore)

window.addEventListener("load", function () { printHighScore() });

function printHighScore() {
  highscores = scoresSorted(highscores, 'score');

  for (var i = 0; i < highscores.length; i++) {
    console.log(highscores[i].secondsLeft);
    var home = document.createElement("li");
    var words = document.createTextNode(highscores[i].initials + ": " + highscores[i].secondsLeft); //content of p
    home.appendChild(words);
    highScorePrint.appendChild(home);
  }
}

function scoresSorted(array, key) {
  return array.sort(function (a, b) {
    if (a.secondsLeft < b.secondsLeft) {
      return 1;
    }
    return -1;
  });
}

clearHighScore.addEventListener("click", function () {
  localStorage.removeItem("highscores");
  window.location.reload();
});
