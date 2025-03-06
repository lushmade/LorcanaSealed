function PreAnswerActionButtons() {
  let $actions = $("#actions");
  $actions.empty();
  $actions.append($('<button>', { text: "reset", class: 'button-grey', onclick: 'Reset()' }))
  $actions.append($('<button>', { text: "skip", class: "button-grey", onclick: 'Next()' }))
}

function PostAnswerActionButtons() {
  let $actions = $("#actions");
  $actions.empty();
  $actions.append($('<button>', { text: "reset", class: 'button-grey', onclick: 'Reset()' }))
  $actions.append($('<button>', { text: "next", class: "button-green", onclick: 'Next()' }))
}

function ResetActionButtons() {
  let $actions = $("#actions");
  $actions.empty();
  $actions.append($('<button>', { text: "start", class: 'button-blue', onclick: 'Start()' }))
}
