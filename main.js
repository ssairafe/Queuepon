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
  $('.couponQueue').empty();
  $(".carrier").children('.cardHolder').remove();
  shuffle(cardArray);
  addCards();
  $(".back").css("display", "inline-block");
  $("#attempts").text("0");
  $("#accuracy").text("0" + " %");
  $("#modulBack").css("display", "none");
  $("#modul").css("display", "none");
  removePlayAgain();
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
  $('.carrier').append(card);
  }
  $(".back").on("click", handleClick);
}

function removeAppearComment() {
  $('.appearHere').remove();
}

function removeModal() {
  $('#modul').remove();
  $('#modulBack').remove();
}

function removePlayAgain() {
  $("#playAgain").remove();
}

function initializeApp() {
  shuffle(cardArray);
  addCards();
  $('html, body').animate({
    scrollTop: $('.queuepon').offset().top
  }, 800);
  setTimeout(removeAppearComment, 1500);
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
      }, 700);

     var companyWebsite = 'www.' + secondCard.attr('company') + '.com';
     var link = $("<a>").attr("href", companyWebsite).addClass('website').text(companyWebsite);
     var linkBox = $("<div>").addClass('queuepon borderless').append(link);
     var couponMessage = $("<div>").addClass("queuepon").text('Use code XVEG45 for 25% off all products at:').append(linkBox);
     var playAgain = $("<span>").attr('id', 'playAgain').text("Click here to play again").on('click', resetStats);

     $('.couponQueue').append(couponMessage);

      if (matches===maxMatches) {
        $("#modul").on("click", removeModal);
        $("#modulBack").css("display", "block");
        $("#modul").css("display", "block");
        gamesPlayed++;
        $("#gamesPlayed").text(gamesPlayed);
        $('html, body').animate({
          scrollTop: $('.queuepon').offset().top
        }, 10);
        $('header').append(playAgain);
      }

    } else {
      attempts++;
      $(".back").off("click", handleClick);
      setTimeout(function () {
        $("#attempts").text(attempts);
        $("#accuracy").text(accuracy +" %");
        firstCard.css("display", "block");
        secondCard.css("display", "block");
       $(".back").on("click", handleClick);
        firstCard = null;
        secondCard = null;
      }, 700);
    }
  }
  accuracy = average(matches, attempts);
  return accuracy;
}
