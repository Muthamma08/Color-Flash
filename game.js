var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var color = ['red', 'blue', 'green', 'yellow'];

function nextSequence() {
  for (var j = 0; j < color.length; j++) {
    var random_number = Math.round(Math.random() * 3);
    var random_color = color[random_number];
    $('#' + random_color)
      .delay(400 * j)
      .fadeOut(100)
      .fadeIn(1000);

    gamePattern.push(random_color);
    playsound(random_color);
  }
  $('h1').text('Correct');
  $('h1').text('Level ' + ++level);
}

function playsound(play) {
  var audio = new Audio('sounds/' + play + '.mp3');
  audio.loop = false;
  audio.play();
}

function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(() => {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}

$('.btn').click(function () {
  var userChosenColor = $(this).attr('id');
  animatePress(userChosenColor);
  playsound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  checkanswer();
});

$('body').keypress(function () {
  if (gamePattern.length === 0 && userClickedPattern.length === 0) {
    nextSequence();
  }
});

function checkanswer() {
  for (var l = 0; l < userClickedPattern.length; l++) {
    if (gamePattern[l] !== userClickedPattern[l]) {
      $('.' + gamePattern[l]).addClass('game-over');
      setTimeout(() => {
        $('.' + gamePattern[l]).removeClass('game-over');
      }, 200);
      playsound('wrong');
      $('h1').html('Game Over!<br>Press any Key to restart');
      gamePattern = [];
      userClickedPattern = [];
      level = 0;
      return false;
    }
  }
  if (gamePattern.length === userClickedPattern.length) {
    gamePattern = [];
    userClickedPattern = [];
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
}
