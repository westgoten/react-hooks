// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
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

  function renderSquare(i) {
    return (
      <button
        className="square"
        onClick={() => {
          if (onClick) {
            onClick(i)
          }
        }}
      >
        {squares[i]}
      </button>
    )
  }
}

function Game() {
  const [gameHistory, setGameHistory] = useLocalStorageState(
    'game-history',
    getInitialGameHistory,
  )
  const moves = gameHistory.history
  const currentSquares = moves[gameHistory.step]
  const winner = calculateWinner(currentSquares)
  const nextValue = calculateNextValue(currentSquares)

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{calculateStatus(winner, currentSquares, nextValue)}</div>
        <ol>
          {moves.map((move, index) => (
            <HistoryStep
              key={index}
              step={index}
              currentStep={gameHistory.step}
              onClick={() =>
                setGameHistory(oldState => ({
                  history: oldState.history.map(squares => squares.slice()),
                  step: index,
                }))
              }
            />
          ))}
        </ol>
      </div>
    </div>
  )

  function selectSquare(square) {
    const chosenSquare = currentSquares[square]
    if (chosenSquare === null && !winner) {
      setGameHistory(oldState => {
        const transientStateHistory = oldState.history.slice(
          0,
          oldState.step + 1,
        )
        const newStateHistory = transientStateHistory.map(squares =>
          squares.slice(),
        )
        const squares = newStateHistory[oldState.step]
        const newSquares = squares.slice()
        newSquares[square] = nextValue
        newStateHistory.push(newSquares)
        return {
          history: newStateHistory,
          step: oldState.step + 1,
        }
      })
    }
  }

  function restart() {
    setGameHistory(getInitialGameHistory())
  }
}

function getInitialGameHistory() {
  const initialGameHistory = {
    history: [Array(9).fill(null)],
    step: 0,
  }
  return initialGameHistory
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function HistoryStep({step, currentStep, onClick}) {
  return (
    <li>
      <button onClick={onClick} disabled={isCurrentStep()}>
        {getButtonLabel()}
      </button>
    </li>
  )

  function getButtonLabel() {
    return `Go to ${step === 0 ? 'game start' : 'move #' + step}${
      isCurrentStep() ? ' (current)' : ''
    }`
  }

  function isCurrentStep() {
    return step === currentStep
  }
}

function App() {
  return <Game />
}

export default App
