var startBtn = document.getElementById("start-btn");

var questionContainer = document.getElementById("questions-container");

var endGame = document.getElementById("end");

var questionEl = document.getElementById("question");

var answerBtnA = document.getElementById("a");

var answerBtnB = document.getElementById("b");

var answerBtnC = document.getElementById("c");

var answerBtnD = document.getElementById("d");

var answerBtns = document.getElementById("answer-buttons");

var timerEl = document.getElementById("timer");

var scoreDiv = document.getElementById("score");

var saveBtn = document.getElementById("save-btn");

var restartBtn = document.getElementById("restart-btn");

var inputEl = document.getElementById("input");

var viewScoresBtn = document.getElementById("view-high-scores");

var scoresContainer = document.getElementById("scores-container");

var resetBtn = document.getElementById("reset-btn");

var questionTracker = 0;
var score = 0;
var timeLeft = 50;
var quizEnd = false;
var highScores = [];

saveBtn.addEventListener("click", function() {
  var inputData = inputEl.value;
  var finalScore = +score + +timeLeft + 1;
  var scoresObject = { name: `${inputData}`, score: `${finalScore}` };
  highScores.push(scoresObject);
  localStorage.setItem("High Scores", JSON.stringify(highScores));
  alert("Your score was saved!");
});

inputEl.addEventListener("keypress", function(e) {
  if (e.which === 13) {
    var inputData = inputEl.value;
    var finalScore = +score + +timeLeft + 1;
    var scoresObject = { name: `${inputData}`, score: `${finalScore}` };
    highScores.push(scoresObject);
    localStorage.setItem("High Scores", JSON.stringify(highScores));
    alert("Your score was saved!");
  }
});

if (localStorage.getItem("High Scores")) {
  highScores = JSON.parse(localStorage.getItem("High Scores"));
};

highScores.sort(function(a, b){
    return b.score - a.score;
}
);

viewScoresBtn.addEventListener("click", function() {
  while (scoresContainer.firstChild) {
    scoresContainer.removeChild(scoresContainer.firstChild);
  }
  for (i = 0; i < highScores.length; i++) {
    var scoreEntries = document.createElement("div");
    scoreEntries.innerText = `${highScores[i].name} : ${highScores[i].score}`;
    scoresContainer.appendChild(scoreEntries);
  }
  
  startBtn.classList.add("hide");
  endGame.classList.add("hide");
  scoresContainer.classList.remove("hide");
});

resetBtn.addEventListener("click", function() {
  startBtn.classList.remove("hide");
  scoresContainer.classList.add("hide");
  questionContainer.classList.add("hide");
  endGame.classList.add("hide");
  questionTracker = 0;
  score = 0;
  timeLeft = 50;
  quizEnd = false;
});

startBtn.addEventListener("click", function() {
  startGame();
  timer();
});

function startGame() {
  startBtn.classList.add("hide");
  questionContainer.classList.remove("hide");
  loadNextQuestion();
};

function loadNextQuestion() {
  if (questionTracker === questions.length) {
    questionContainer.classList.add("hide");
    endGame.classList.remove("hide");
    quizEnd = true;
    var finalScore = +score + +timeLeft;
    scoreDiv.innerText = `Your Score: ${finalScore}`;
    return;
  }
  var q = questions[questionTracker];
  questionEl.innerText = q.title;
  answerBtnA.innerText = q.choices[0];
  answerBtnB.innerText = q.choices[1];
  answerBtnC.innerText = q.choices[2];
  answerBtnD.innerText = q.choices[3];
};

answerBtns.addEventListener("click", function(event) {
  if (event.target.innerText == questions[questionTracker].answer) {
    alert("correct");
    questionTracker++;
    score++;
    loadNextQuestion();
  } else if (event.target.innerText !== questions[questionTracker].answer) {
    alert("wrong");
    questionTracker++;
    timeLeft -= 10;
    loadNextQuestion();
  }
});

function timer() {
  console.log(timeLeft);
  var timeInterval = setInterval(function() {
    timerEl.textContent = "Timer: " + timeLeft;
    timeLeft--;

    if (timeLeft <= 0 || quizEnd === true) {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      questionContainer.classList.add("hide");
      endGame.classList.remove("hide");
    }
  }, 1000);
}
