let SetSevenCards = {}

function FetchFromLorcast() {
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
      for (let tier_card of SetSevenTiers) {
        let card_num = tier_card["CardNo"]
        let card = SetSevenCards[card_num]
        card["tier"] = tier_card["Tier"]
      }
      ResetActionButtons()
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
}