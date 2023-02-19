var time = document.getElementById("timer");
var yourScore = document.querySelector(".display-3");
var submitButton = document.getElementById("buttonInitials");
var inputLine = document.getElementById("inlineFormInput");

var secondsLeft = 50;
var startButton = document.getElementById("startQuiz");
var cardQuestions = document.getElementById("questionsCard");
var displayJumbo = document.querySelector(".jumbotron");

startButton.addEventListener("click", startGame);

var answer1 = document.getElementById("button1");
var answer2 = document.getElementById("button2");
var answer3 = document.getElementById("button3");
var answer4 = document.getElementById("button4");
var question = document.getElementById("questions");
var correctAnswer = document.getElementById("correctIncorrect");
var incorrectAnswer = document.getElementById("correctIncorrect");

var runningQuestion = 0;

var quizBtn = document.querySelectorAll(".quizBtn");
var highscores = JSON.parse(localStorage.getItem("highscores")) || [];

function setTime() {
  var timerInterval = setInterval(function () {
    secondsLeft--;
    //console.log(secondsLeft);
    time.textContent = "Time: " + secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      cardQuestions.setAttribute("style", "display: none");
      displayJumbo.setAttribute("style", "display: block");
      yourScore.textContent = "Your score is: " + secondsLeft;
      startButton.setAttribute("style", "display: none");
      submitButton.setAttribute("style", "display: inline");
      inputLine.setAttribute("style", "display: inline-block");

    } else if (runningQuestion === 5) {
      clearInterval(timerInterval);
      //console.log(secondsLeft);
      cardQuestions.setAttribute("style", "display: none");
      displayJumbo.setAttribute("style", "display: block");
      yourScore.textContent = "Your score is: " + secondsLeft;
      startButton.setAttribute("style", "display: none");
      submitButton.setAttribute("style", "display: inline");
      inputLine.setAttribute("style", "display: inline-block");

    }
  }, 1000);
}

function startGame() {
  setTime();
  firstQuestion();
  //console.log("game on");
  cardQuestions.setAttribute("style", "display: block");
  displayJumbo.setAttribute("style", "display: none");
}

function firstQuestion() {
  var quest = questions[runningQuestion];
  question.textContent = quest.question;
  answer1.textContent = quest.answer1;
  answer2.textContent = quest.answer2;
  answer3.textContent = quest.answer3;
  answer4.textContent = quest.answer4;
}

for (var i = 0; i < quizBtn.length; i++) {
  quizBtn[i].addEventListener("click", function userAnswer(event) {
    event.stopPropagation();
    if (event.currentTarget.innerText === questions[runningQuestion].correct) {
      correctAnswer.textContent = "Correct + 5 sec";
      correctAnswer.setAttribute("style", "color: green");
      secondsLeft = secondsLeft + 5;
      //console.log("Correct Answer");
    } else {
      incorrectAnswer.textContent = "Incorrect - 5 sec";
      incorrectAnswer.setAttribute("style", "color: red");
      secondsLeft = secondsLeft - 5;
      //console.log("Incorrect minus 5 seconds");
    }
    //console.log(runningQuestion);
    runningQuestion++;

    if (runningQuestion < 5) {
      firstQuestion();
    }
  });
}

submitButton.addEventListener("click", function (event) {
  event.stopPropagation();
  //console.log("click");

  var initials = inputLine.value;
  var finalScore = { initials, secondsLeft };
  highscores.push(finalScore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
});

var questions = [{
  question: "Which statement creates a new object using the Person constructor? Which statement creates a new Person object called 'student'?",
  answer1: "var student = new Person();",
  answer2: "var student = construct Person;",
  answer3: "var student = Person();",
  answer4: "var student = construct Person();",
  correct: "var student = new Person();"
}, {
  question: "Which property references the DOM object that dispatched an event?",
  answer1: "self",
  answer2: "target",
  answer3: "source",
  answer4: "object",
  correct: "target"
}, {
  question: "Which Object method returns an iterable that can be used to iterate over the properties of an object?",
  answer1: "Object.get()",
  answer2: "Object.loop()",
  answer3: "Object.each()",
  answer4: "Object.keys()",
  correct: "Object.keys()"
}, {
  question: "What is one difference between collections created with Map and collections created with Object?",
  answer1: "You can iterate over values in a Map in their insertion order.",
  answer2: "You can count the records in a Map with a single method call.",
  answer3: "Keys in Maps can be strings.",
  answer4: "You can access values in a Map without iterating over the whole collection.",
  correct: "You can count the records in a Map with a single method call."
}, {
  question: "Which of the following operators can be used to do a short-circuit evaluation?",
  answer1: "++",
  answer2: "--",
  answer3: "==",
  answer4: "||",
  correct: "||"
}];

