$(document).ready(initializeApp);

function average(num1, num2) {
 var avg = (num1 / num2) * 100;
  return avg.toFixed(2);
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
  $(".container").children('.cardHolder').remove();
  shuffle(cardArray);
  addCards();
  $(".back").css("display", "block");
  $("#attempts").text("0");
  $("#accuracy").text("0" + " %");
  $("#modulBack").css("display", "none");
  $("#modul").css("display", "none");
}

var cardArray = ['target', 'amazon', 'starbucks', 'playstation', 'dominos', 'bmw', 'apple', 'lafit', 'android', 'target', 'amazon', 'starbucks', 'playstation', 'dominos', 'bmw', 'apple', 'lafit', 'android'];

function shuffle (array) {
  var currentIndex = array.length;
  var tempValue , randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
  return array;
}

function addCards () {
  for (var i = 0; i < cardArray.length; i++){
  var companyName = cardArray[i];
  var backCard = $('<div>', {
    class: 'back ',
    company: companyName
      }).text("?");
  var frontCard = $('<div>', {
    class: 'front ' + companyName
  });
  var card = $('<div>', {
    class: 'cardHolder'
  });
    card.append(frontCard, backCard);
  $('.container').append(card);
  }
  $(".back").on("click", handleClick);

}
function initializeApp() {
  shuffle(cardArray);
  addCards();
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
        $("#modul").on("click", resetStats);
        $("#modulBack").css("display", "block");
        $("#modul").css("display", "block");
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
