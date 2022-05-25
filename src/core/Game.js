function Game(code) {
  const $game = {
    style(board) {
      return {
        setOne(tag, value) {
          board.style[tag] = value;
          return this;
        },
        setMany(tags) {
          Object.keys(tags).forEach((tag) => this.setOne(tag, tags[tag]));
          return this;
        },
      };
    },
  };
  return ($document) => {
    code($game, $document);
  };
}
