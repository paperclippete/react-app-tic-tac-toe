import React, { useState } from 'react';
import { Board } from './board';
  
export const Game = () => {
  const [history, setHistory] = useState([{
    squares: Array(9).fill(null)
  }]);
  
  const [xIsNext, setXIsNext] = useState(true);
  const [step, setStep] = useState(0);

  const handleClick = (e, i) => {
    const loop = history.slice(0, step + 1);
    const current = loop[loop.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
        return;
      }
    squares[i] = xIsNext ? 'X' : 'O';

    setHistory([...history, { squares: squares }]);
    setXIsNext(!xIsNext);
    setStep(history.length);
  };

  const jumpTo = (e, step) => {
      setStep(step);
      setXIsNext((step % 2) === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move :
      'Go to game start';
    return (
      <li key={move}>
        <button onClick={(e) => jumpTo(e, move)}>{desc}</button>
      </li>
    );
  });

  const current = history[step];
  const winner = calculateWinner(current.squares);
  
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          squares={current.squares}
          onClick={handleClick}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
          <ol>{moves}</ol>
      </div>
    </div>
  );
}
  
const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}