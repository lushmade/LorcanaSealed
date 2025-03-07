const PullThresholds = {
  NR: {
    L: 0.05,
    SR: 0.2,
    L2: 0.25
  },
  F:{
    C:0.51,
    U:0.76,
    R:0.9,
    SR:0.95,
    L:0.98,
    E:1
  }
}

function BuildPack() {
  let cards = PullCommons()
  cards = cards.concat(PullUncommons())
  cards = cards.concat(PullRarePlus())
  cards = cards.concat(PullFoil())
  return cards
}

function PullCommons() {
  let cards = []
  // Commons
  for (let ink of Object.keys(SetSevenCardsBucketed["Common"])) {
    if(ink === "All") {
      continue
    }
    let cardsForInk = SetSevenCardsBucketed["Common"][ink];
    let pick = Math.floor(Math.random() * cardsForInk.length);
    cards.push(cardsForInk[pick])
  }
  return cards;
}

function PullUncommons() {
  let cards = []
  // Uncommon
  let uncommons = SetSevenCardsBucketed["Uncommon"]
  let uncommonsCount = Object.keys(uncommons).length
  let possibleKeys = [...Array(uncommonsCount).keys()]
  possibleKeys.sort(() => Math.random() - 0.5)
  for (let i=0; i<3; i++) {
    cards.push(uncommons[possibleKeys[i]]);
  }
  return cards;
}

function PullRarePlus() {
  let cards = []
  let firstPull = Math.random()
  let secondPull = Math.random()
  if (firstPull < PullThresholds.NR.L) {
    cards.push(RarePlusCard("Legendary"))
    cards.push(RarePlusCard("Legendary"))
  } else if (firstPull < PullThresholds.NR.SR) {
    cards.push(RarePlusCard("Super_rare"))
    if (secondPull < PullThresholds.NR.L2) {
      cards.push(RarePlusCard("Legendary"))
    } else {
      cards.push(RarePlusCard("Super_rare"))
    }
  } else {
    cards.push(RarePlusCard("Rare"))
    if (secondPull < PullThresholds.NR.L) {
      cards.push(RarePlusCard("Legendary"))
    } else if (secondPull < PullThresholds.NR.SR) {
      cards.push(RarePlusCard("Super_rare"))
    } else {
      cards.push(RarePlusCard("Rare"))
    }
  }
  return cards;
}

function RarePlusCard(rarity) {
  let cards = SetSevenCardsBucketed[rarity]
  let pick = Math.floor(Math.random() * cards.length);
  return cards[pick]
}

function PullFoil() {
  let pull = Math.random()
  let card_num;
  if (pull < PullThresholds.F.C) {
    card_num = Math.floor(Math.random()*72);
    return SetSevenCardsBucketed["Common"]["All"][card_num]
  } else if (pull < PullThresholds.F.U) {
    card_num = Math.floor(Math.random()*54)
    return SetSevenCardsBucketed["Uncommon"][card_num]
  } else if (pull < PullThresholds.F.R) {
    card_num = Math.floor(Math.random()*48)
    return SetSevenCardsBucketed["Rare"][card_num]
  } else if (pull < PullThresholds.F.SR) {
    card_num = Math.floor(Math.random()*18)
    return SetSevenCardsBucketed["Super_rare"][card_num]
  } else if (pull < PullThresholds.F.L) {
    card_num = Math.floor(Math.random()*12)
    return SetSevenCardsBucketed["Legendary"][card_num]
  } else {
    console.log("you pulled an enchanted")
    card_num = Math.floor(Math.random()*204)
    return SetSevenCards[card_num]
  }
}