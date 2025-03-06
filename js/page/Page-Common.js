
function Header() {
  $("body").prepend($('<header>'));
  $('header').append($('<h1>'));
  $('header h1').append($('<a>', { href: 'index.html', text: 'Lorcana Draft & Sealed Tier Trainer' }));
}

function Footer() {
  $("body").append($('<footer>'));
  $('footer').append($('<p>', { text: 'Tiers from this '} ));
  $('footer p').append($('<a>', {
    href: 'https://infinite.tcgplayer.com/article/The-Archazia-s-Island-Booster-Draft-And-Sealed-Deck-Tier-List/0cddbc37-0e6b-4384-b605-84bdad57ad86',
    text: 'TCGPlayer Article',
    class: 'indigo'
  }));

}