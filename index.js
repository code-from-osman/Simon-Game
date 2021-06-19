var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;





// when we click a "button", will store the button (the colour) clicked into an array + play a sound
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  var randomChosenColourSoundClick = "sounds/" + userChosenColour + ".mp3";

  userClickedPattern.push(userChosenColour);
  playSound(randomChosenColourSoundClick);

  animatePress(userChosenColour);

  var recentUserClick = userClickedPattern[userClickedPattern.length - 1];
  checkAnswer(recentUserClick);

})




function checkAnswer(currentLevel) {
  if (currentLevel === gamePattern[userClickedPattern.length - 1]) {
    console.log("Success");
    if (gamePattern.length === userClickedPattern.length) {
      console.log("success of whole sequence");

      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      },1000);
    }
  }

  else if (currentLevel !== gamePattern[userClickedPattern.length - 1]) {
    console.log("wrong");
    soundFail();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    started = false;
    var lastLevel = level;

    $("h1").text("Game Over,you reached level " + lastLevel + ", Press Any Key to Restart");

    level = 0;
    userClickedPattern = [];
    gamePattern = [];




  }


}



function soundFail() {
  var audio1 = new Audio("sounds/wrong.mp3");
  audio1.play();
}


function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}


function animatePress(currentColour) {

  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 50)
}



$(document).keydown(function() {

  if (!started) {
    nextSequence();
    $("h1").text("level " + level);
    started = true;
  }

})









function nextSequence() {
  level += 1;
  $("h1").text("level " + level);

  var randomNum = Math.random();
  randomNum = randomNum * 4;
  randomNum = Math.floor(randomNum);


  var randomChosenColour = buttonColours[randomNum];
  gamePattern.push(randomChosenColour);

  console.log(gamePattern)


  randomChosenColourStringId = "#" + randomChosenColour;
  randomChosenColourSound = "sounds/" + randomChosenColour + ".mp3";

  $(randomChosenColourStringId).fadeOut(150).fadeIn(150);
  playSound(randomChosenColourSound);

}
