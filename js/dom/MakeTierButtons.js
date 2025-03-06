function MakeTierButtons() {
  let buttons = [];
  const tiers = [
    { letter:'a', desc: "Bombs", color: 'red' },
    { letter:'b', desc: "Great", color: 'orange' },
    { letter:'c', desc: "Playable", color: 'yellow' },
    { letter:'d', desc: "Filler", color: 'blue' },
    { letter:'f', desc: "Avoid", color: 'violet' },
  ]
  for (let tier of tiers) {
    let $button = $('<button>', { type: 'button', class:  `button-${tier.color}`, id: `tier-${tier.letter}` });
    $button.append($('<div>', { class: `tier-letter`, text: `${tier.letter}` }))
    $button.append($('<div>', { class: 'tier-desc', text: `${tier.desc}` }))
    $button.on('click', (e) => { Judge(tier.letter) })
    buttons.push($button)
  }
  return buttons
}