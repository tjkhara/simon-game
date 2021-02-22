let level = 0;

let gameStarted = false;

let userClickedPattern = [];

let gamePattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

// Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function () {
  if (!gameStarted) {
    $("#level-title").text(`Level ${level}`);
    nextSequence();
    gameStarted = true;
  }
});

//   Use jQuery to detect when any of the buttons are clicked and trigger a handler function.
$(".btn").on("click", function (e) {
  let userChosenColor = e.currentTarget.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text(`Level ${level}`);

  let randomNumber = genRandomNumber(0, 3);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // flash the button
  $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

function genRandomNumber(min, max) {
  var rdm = Math.random() * (max - min) + min;
  var rdm = Math.round(Math.random() * (max - min) + min);
  return rdm;
}

function playSound(name) {
  var audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");

  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  console.log("ucp", userClickedPattern);
  console.log("game pattern", gamePattern);

  // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    // If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failure");
    playSound("wrong")
    $('body').addClass('game-over')
    setTimeout(() => {
        $('body').removeClass('game-over')
    }, 200)
    $('h1').text('Game Over, Press Any Key to Restart')
    startOver()
  }
}


function startOver(){
    level = 0
    gamePattern = []
    gameStarted = false
}