let buttonColours = ["red", "blue", "green", "yellow"];
let started = false;
let gamePattern = [];
let userClickedPattern = [];
let level = 0;

function nextSequence() {
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
}

function playSound(name) {
  new Audio("sounds/" + name + ".mp3").play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        userClickedPattern = [];
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startGame() {
  if (!started) {
    $("h1").text("Level 0");
    started = true;
    nextSequence();
  }
}

// Event Listeners

$(".btn").click(function() {
  let userChosenColour = this.id;
  animatePress(userChosenColour);
  playSound(userChosenColour);
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function() {
  startGame();
});

$(document).on("click", function() {
  startGame();
});
