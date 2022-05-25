function Board() {
  const $ = {
    board: document.getElementById("board"),
  };
  const $document = {
    set(element) {
      $.board.innerHTML = null;
      $.board.appendChild(element);
    },
  };
  const $games = [];
  return {
    addOne(game) {
      $games.push(game);
      return this;
    },
    addMany(games) {
      games.forEach((game) => this.addOne(game));
      return this;
    },
    runOne(index) {
      $games[index]($document);
      return this;
    },
    runAll() {
      $games.forEach((_, index) => this.runOne(index));
      return this;
    },
  };
}
