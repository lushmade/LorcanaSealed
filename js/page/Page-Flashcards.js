window.onload = function() {
  Header()
  Footer()

  FetchFromLorcast(function() { ResetActionButtons() })
}
