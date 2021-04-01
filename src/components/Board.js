import React, { useState } from 'react';
import '../App.css'

let lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const Board = () => {
    const [info, setInfo] = useState([])
    let win
    const [squares, setSquares] = useState(Array(9).fill(null))
    const generateValue = (idx) => {
        if (winner || squares[idx] !== null) return
        const copySquares = [...squares]
        copySquares[idx] = nextPlayer(squares)
        setSquares(copySquares)
        setInfo([...info, `Игрок ${nextPlayer(squares)} Сделал ход по ячейке ${idx + 1}`])
    }
    const nextPlayer = (square) => {
        const countX = square.filter(el => el === 'x').length
        const countY = square.filter(el => el === 'o').length
        return countX <= countY ? 'x' : 'o'
    }

    const detectWinner = (square) => {
        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i]
            win = lines[i]
            if (square[a] && square[a] === square[b] && square[a] === square[c]) {
                return square[c]
            }
        }
        return null
    }

    const finalResult = () => {
        return winner ? `Win: ${winner}` : squares.includes(null) ? 'Next turn' : 'Draw'
    }

    let winner = detectWinner(squares)
    let final = finalResult()

    const resetGame = () => {
        setSquares(Array(9).fill(null))
        setInfo([])
    }
    
    return (
        <div>
            <div className='board'>
                <div className="board-box">
                    {
                        squares.map((el,idx) => (
                            <button onClick={() => generateValue(idx)} className={`styles-btn ${winner && (win.includes(idx) ? 'green' : 'red')}`}>{squares[idx]}</button>

                        ))
                    }
                    <a className='board-btn' onClick={resetGame}>Reset</a>
                </div>
            </div>
            <p className='board-result'>{final}</p>
            <div className='results'>
                {
                    info.map(el => <li>{el}</li>)
                }
            </div>
        </div>
    );
};

export default Board;