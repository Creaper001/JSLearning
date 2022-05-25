const TicTacToe = Game(($game, $document) => {
  const name = "TicTacToe";
  const clean = "_";
  const players = ["X", "O"];
  var play = 0;
  var map = [...Array(3)].map(() => Array(3).fill(-1));
  (() => {
    draw();
  })();
  function player(number) {
    if (number === -1) return clean;
    return players[number];
  }
  function draw() {
    const board = document.createElement(name);
    map.forEach((row, rowIndex) => {
      row.forEach((cell, cellIndex) => {
        const element = document.createElement("cell");
        element.classList.add("cell");
        element.setAttribute("data-row", rowIndex);
        element.setAttribute("data-cell", cellIndex);
        element.innerText = player(cell);
        board.appendChild(element);
      });
    });
    $document.set(board);
    style(board);
    on(board);
  }
  function style(board) {
    $game.style(board).setMany({
      margin: "40px auto",
      width: "400px",
      height: "400px",
      border: "1px solid black",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gridTemplateRows: "repeat(3, 1fr)",
    });
    board.querySelectorAll(".cell").forEach((cell) => {
      $game.style(cell).setMany({
        border: "1px solid black",
        fontSize: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      });
    });
  }
  function on(board) {
    board.querySelectorAll(".cell").forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.innerText !== clean) return;

        const rowIndex = cell.getAttribute("data-row");
        const cellIndex = cell.getAttribute("data-cell");
        map[rowIndex][cellIndex] = play;

        draw();

        setTimeout(() => {
          win();
          change();
        }, 100);
      });
    });
  }
  function change() {
    play = (play + 1) % 2;
  }
  function win() {
    const win = [];
    win.push(
      map.some((_, index) => {
        return map.every((row) => row[index] === play);
      })
    );
    win.push(
      map.some((row) => {
        return row.every((cell) => cell === play);
      })
    );
    win.push(
      map.every((_, index) => {
        return map[index][index] === play;
      })
    );
    win.push(
      map.every((_, index) => {
        return map[2 - index][index] === play;
      })
    );
    if (win.some((value) => value === true)) {
      alert(`${players[play]} wins!`);
      location.reload();
    }
  }
});
