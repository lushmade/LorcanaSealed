function Start() {
  let $stats = $("#stats");
  $stats.empty();
  $stats.append($('<div>', { text: "Stats: ", class: "stats-text" }))
  $stats.append($('<div>', { text: "0", id: "stats-correct", class: "stats-text" }))
  $stats.append($('<div>', { text: "/", class: "stats-text" }))
  $stats.append($('<div>', { text: "0", id: "stats-total", class: "stats-text" }))
  CreatePickOrder()
  Next();
}

function Reset() {
  $("#stats").empty();
  ResetCardOverlay()
  $('#card-image').removeAttr("style");
  let $decisionOrAnswer = $('#decision-or-answer');
  $decisionOrAnswer.empty()
  $decisionOrAnswer.css('display', 'none');
  ResetActionButtons()
  }

function Next() {
  ResetCardOverlay()
  Pick();

  let $decisionOrAnswer = $('#decision-or-answer');
  $decisionOrAnswer.css('display', 'flex');
  $decisionOrAnswer.empty()
  let tierButtons = MakeTierButtons();
  for (let tierButton of tierButtons) {
    $decisionOrAnswer.append(tierButton)
  }

  PreAnswerActionButtons()
}

// Pick next card

let PickOrder = []

function CreatePickOrder() {
  let numberOfCards = Object.keys(SetSevenCards).length
  PickOrder = [...Array(numberOfCards).keys()]
  PickOrder.sort(() => Math.random() - 0.5)
}

function Pick() {
  let pick = SetSevenCards[PickOrder.pop()];
  let $card = $("#card-image");
  $card.css("background-image", `url(${pick.image_uris.digital.normal})`)
  $card.attr("set-no", `${pick.set.code}`)
  $card.attr("card-no", `${pick.collector_number}`)
  $card.attr("tier", `${MapTier(pick.tier)}`)
}

function MapTier(tier) {
  switch (tier) {
    case "B+":
    case "B":
    case "B-":
      return "B";
    case "C+":
    case "C":
    case "C-":
      return "C";
    default:
      return tier;
  }
}

// Judge answer

function Judge(selectedTier) {
  let colorForAnswer = {
    "A": "red",
    "B": "orange",
    "C": "yellow",
    "D": "blue",
    "F": "indigo"
  }

  let $card = $("#card-image");
  let setNo = $card.attr("set-no");
  let cardNo = $card.attr("card-no");

  let correctAnswer = $card.attr("tier");

  if (correctAnswer.toLowerCase() === selectedTier.toLowerCase()) {
    Correct()
  } else {
    Wrong()
  }

  let $answer = $("#decision-or-answer");
  $answer.empty()
  $answer.append(
    $('<div>', { id: 'answer',
      class: `${colorForAnswer[correctAnswer]}`,
      text: `Tier ${correctAnswer}` }))
}

function Correct() {
  // update stats
  let $stats = $("#stats-correct");
  let correct = parseInt($stats.text()) + 1
  $stats.text(correct)
  let $statsTotal = $("#stats-total");
  let total = parseInt($statsTotal.text()) + 1
  $statsTotal.text(total)

  // update dom
  CardOverlayCorrect()
  PostAnswerActionButtons()
}

function Wrong() {
  // update stats
  let $statsTotal = $("#stats-total");
  let total = parseInt($statsTotal.text()) + 1
  $statsTotal.text(total)

  // update dom
  CardOverlayWrong()
  PostAnswerActionButtons()
}