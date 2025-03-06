function CardOverlayCorrect() {
  let $cardOverlay = $('#card-overlay');
  $cardOverlay.empty()
  $cardOverlay.append(
    $('<div>', { class: 'card-result', id: 'card-result-correct', text: '✔' }))
  $cardOverlay.append(
    $('<div>', { id: 'card-result-overlay' }))
}

function CardOverlayWrong() {
  let $cardOverlay = $('#card-overlay');
  $cardOverlay.empty()
  $cardOverlay.append(
    $('<div>', { class: 'card-result', id: 'card-result-wrong', text: '✘' }))
  $cardOverlay.append(
    $('<div>', { id: 'card-result-overlay' }))
}

function ResetCardOverlay() {
  $('#card-overlay').empty()
}