import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights Out. */

function Board({
  nrows = 5,
  ncols = 5,
  chanceLightStartsOn = 0.25
}) {
  const [board, setBoard] = useState(createBoard());

  /** Create a board of true/false values. */
  function createBoard() {
    let initialBoard = [];

    for (let y = 0; y < nrows; y++) {
      let row = [];

      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }

      initialBoard.push(row);
    }

    return initialBoard;
  }

  /** Check whether every light is off. */
  function hasWon() {
    return board.every(row => row.every(cell => !cell));
  }

  /** Flip clicked cell plus neighbors. */
  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const boardCopy = oldBoard.map(row => [...row]);

      const flipCell = (y, x) => {
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      flipCell(y, x);
      flipCell(y - 1, x);
      flipCell(y + 1, x);
      flipCell(y, x - 1);
      flipCell(y, x + 1);

      return boardCopy;
    });
  }

  if (hasWon()) {
    return <h1>You Won!</h1>;
  }

  return (
    <div>
      <table className="Board">
        <tbody>
          {board.map((row, y) => (
            <tr key={y}>
              {row.map((isLit, x) => (
                <Cell
                  key={`${y}-${x}`}
                  isLit={isLit}
                  flipCellsAroundMe={() =>
                    flipCellsAround(`${y}-${x}`)
                  }
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Board;