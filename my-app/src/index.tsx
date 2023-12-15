import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { SquareValue } from './types/square-value'
import Square from './square'

interface BordProps {
  squares: SquareValue[]
  onClick: (i: number) => void
}

function Board (props: BordProps) {
  const renderSquare = (i: number) => {
    return <Square 
      value={props.squares[i]} 
      onClick={() => props.onClick(i)}
    />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [ state, setState ] = useState({
    history: [{squares: Array(9).fill(null)}],
    stepNumber: 0,
    xIsNext: true,
  })

  function handleClick(i: number) {
    const history = state.history.slice(0, state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) return
    
    squares[i] = state.xIsNext? 'X': 'O'
    setState({
      history: history.concat([{squares: squares}]),
      stepNumber: history.length,
      xIsNext: !state.xIsNext
    })
  }

  function jumpTo(step: number) {
    setState({
      history: state.history,
      stepNumber: step,
      xIsNext: (step % 2) === 0
    })
  }

  const history = state.history
  const current = history[state.stepNumber]
  const winner = calculateWinner(current.squares)

  const moves = history.map((step, move) => {
    const desc = move ?
      'Go to move #' + move:
      'Go to game start' 
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  const status = () => {
    if (winner) {
      return 'Winner: ' + winner
    } else {
      return 'Next player: ' + (state.xIsNext? 'X': 'O');
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status()}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// ========================================

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)
root.render(<Game />);

function calculateWinner(squares: SquareValue[]) {
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