let SetSevenCards = {}
let SetSevenCardsBucketed = {
  "Common": {
    "Amber": [],
    "Amethyst": [],
    "Emerald": [],
    "Ruby": [],
    "Sapphire": [],
    "Steel": [],
    "All": []
  },
  "Uncommon": [],
  "Rare": [],
  "Super_rare": [],
  "Legendary": []
}

function FetchFromLorcast(callback) {
  fetch('https://api.lorcast.com/v0/cards/search?q=set:7')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      SetSevenCards = {};
      for (let card of data.results) {
        let card_num = card["collector_number"]
        if (card_num > 204) {
          continue
        }
        SetSevenCards[card["collector_number"]] = card
      }
      for (let tier_card of SetSevenCardTiers) {
        let cardNum = tier_card["CardNo"]
        let card = SetSevenCards[cardNum]
        card["tier"] = tier_card["Tier"]
      }
      for (let cardNum of Object.keys(SetSevenCards)) {
        let card = SetSevenCards[cardNum]
        let rarity = card.rarity;
        if (rarity === "Common") {
          let ink = card.ink;
          SetSevenCardsBucketed[rarity][ink].push(card);
          SetSevenCardsBucketed[rarity]["All"].push(card);
        } else {
          SetSevenCardsBucketed[rarity].push(card)
        }
      }
      callback()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}