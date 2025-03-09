window.onload = function() {
  Header()
  Footer()

  FetchFromLorcast(function() { ResetActionButtons() })
}

let cardDictionary = {}

function OpenBoosterPack() {
  cardDictionary = {}
  let pack = BuildPack();
  pack.forEach(card => {
     cardDictionary[self.crypto.randomUUID()] = card
  })
  $("#reveal").empty();
  $("#reveal").css("display", "none");
  let $cards = $("#cards");
  $cards.empty()
  $cards.css('display', 'grid')

  for (let uuid of Object.keys(cardDictionary)) {
    let card = cardDictionary[uuid]
    let boosterCard = $('<div>', {class: 'booster-card'});
    let decisionOverlay = $('<div>', { class: `booster-card-decision maybe`,
      text: "?",
      id: `decision-${uuid}`,
      onclick: `toggle("${uuid}")` })
    boosterCard.append(decisionOverlay)
    let cardImage = $('<div>', {class:'booster-card-image'});
    cardImage.css('background-image', `url(${card.image_uris.digital.normal})`);
    boosterCard.append(cardImage)
    boosterCard.attr("tier", card.tier)
    boosterCard.attr("uuid", uuid)
    $cards.append(boosterCard);
  }

  let $foilOverlay = $('<div>', { class: 'foil-overlay' });
  $foilOverlay.css('background-image',
    'url("../assets/foil-overlay25.png")')
  $('.booster-card:last').prepend($foilOverlay)

  AfterOpenActionButtons()
}

function toggle(uuid) {
  let $decision = $(`#decision-${uuid}`);
  if ($decision.hasClass('keep')) {
    $decision.removeClass('keep')
    $decision.addClass('avoid')
    $decision.text("✘")
  } else if ($decision.hasClass('maybe')) {
    $decision.removeClass('maybe')
    $decision.addClass('keep')
    $decision.text("✔")
  } else if ($decision.hasClass('avoid')) {
    $decision.removeClass('avoid')
    $decision.addClass('maybe')
    $decision.text("?")
  }
}

function Start() {
  OpenBoosterPack();
}

function Reveal() {
  let $revealContainer = $("#reveal");
  if ($revealContainer.css('display') === 'grid') {
    return;
  }
  $revealContainer.css('display', 'grid');
  $revealContainer.empty()
  let cardsByTier = {}
  let cards = $(".booster-card")
  cards.sort(function(a,b) {
      let aTier = TierMap($(a).attr("tier"));
      let bTier = TierMap($(b).attr("tier"));
      return aTier - bTier;
    });
  cards.each(index => {
    let card = cards[index]
      let tier = $(card).attr("tier")
      if (!(tier in cardsByTier)) {
        cardsByTier[tier] = []
      }
      cardsByTier[tier].push(card)
    })
  let tiers = Object.keys(cardsByTier)
    .sort(function(a,b) {
      TierMap($(a).attr("tier")) - TierMap($(b).attr("tier"))
    })
  tiers.forEach(tier => {
    let cardsInTier = cardsByTier[tier]
    cardsInTier.forEach(card => {
      if (tier === "A" || tier === "B+") {
        $(card).prepend($("<div>", { class: "booster-reveal-border border-red" }));
      } else if (tier === "B" || tier === "B-") {
        $(card).prepend($("<div>", { class: "booster-reveal-border border-orange" }));
      } else if (tier === "C+" || tier === "C") {
        $(card).prepend($("<div>", { class: "booster-reveal-border border-yellow" }));
      } else if (tier === "C-" || tier === "D") {
        $(card).prepend($("<div>", { class: "booster-reveal-border border-blue" }));
      } else {
        $(card).prepend($("<div>", { class: "booster-reveal-border border-violet" }));
      }
      $revealContainer.append(card)
    })
  })
  $("#cards").hide()
}

function TierMap(tier) {
  switch(tier) {
    case "A":
      return 0;
    case "B+":
      return 1;
    case "B":
      return 2;
    case "B-":
      return 3;
    case "C+":
      return 4;
    case "C":
      return 5;
    case "C-":
      return 6;
    case "D":
      return 7;
    case "F":
      return 8;
    default:
      return 9;
      }
}

function AfterOpenActionButtons() {
  let $opened = $("#opened-packs");
  let openCount = parseInt($opened.text()) + 1;
  if (openCount > 6) {
    openCount = 1;
  }
  $opened.text(openCount);


  let $actions = $("#actions");
  $actions.empty();
  $actions.append($('<button>', { text: "reveal", class: 'button-green', onclick: 'Reveal()' }))
  if (openCount === 6) {
    $actions.append($('<button>', { text: "restart", class: "button-blue", onclick: 'Start()' }))
  } else {
    $actions.append($('<button>', { text: "next", class: "button-blue", onclick: 'Start()' }))
  }
}