$(document).ready(initializeApp);

function average(num1, num2) {
 var avg = (num1 / num2) * 100;
 return avg;
}

var firstCard = null;
var secondCard = null;
var gamesPlayed = 0;
var attempts = 0;
var accuracy = 0;
var maxMatches = 9;
var matches = null;
function resetStats() {
  firstCard= null;
  secondCard= null;
  matches= null;
  attempts= null;
  $("#attempts").text("0");
  $("#accuracy").text("0" + " %");
  $(".back").css("display", "block");
  $("header").text("Quepon");
}

function initializeApp() {
  $(".back").on("click", handleClick);
}

function handleClick(event) {
  $(this).css("display", "none");
  if (firstCard === null) {
    firstCard = $(event.currentTarget);
  } else {
    secondCard = $(event.currentTarget);
    if (firstCard.attr('company') === secondCard.attr('company')) {
      matches++;
      attempts++;
      $(".back").off("click", handleClick);
      setTimeout(function(){
        $("#attempts").text(attempts);
        $("#accuracy").text(accuracy +" %");
        $(".back").on("click", handleClick);
        firstCard.css("display", "none");
        secondCard.css("display", "none");
        firstCard = null;
        secondCard = null;
      }, 1200);
      if (matches===maxMatches) {
        $("header").text("Enjoy those Quepons! Click to play again").css( "font", "1rem");
        $("header").on("click", resetStats);
        gamesPlayed++;
        $("#gamesPlayed").text(gamesPlayed);
      }
      console.log("match");
    } else {
      attempts++;
      $(".back").off("click", handleClick);
      setTimeout(function () {
        $("#attempts").text(attempts);
        $("#accuracy").text(accuracy +" %");
        firstCard.css("display", "block");
        secondCard.css("display", "block");
       $(".back").on("click", handleClick);
        console.log("Not matching");
        firstCard = null;
        secondCard = null;
      }, 1200);
    }
  }
  accuracy = average(matches, attempts);
  return accuracy;
}
