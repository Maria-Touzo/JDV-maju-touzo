import { useEffect, useRef } from 'react';
import Square from '../Square/Square';
import styles from './board.module.css';

export default function Board({ xIsNext, squares, onPlay, onGameEnd }) {
  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo ? winnerInfo.winner : null;
  const winningLine = winnerInfo ? winnerInfo.line : [];
  const isTie = !winner && squares && squares.every(Boolean);

  // Evita pontuar mais de uma vez na mesma partida
  const hasEndedRef = useRef(false);

  useEffect(() => {
    if ((winner || isTie) && !hasEndedRef.current) {
      hasEndedRef.current = true;
      if (onGameEnd) {
        onGameEnd(winner ? winner : 'tie');
      }
    } else if (!winner && !isTie) {
      hasEndedRef.current = false;
    }
  }, [winner, isTie, onGameEnd]);

  function handleClick(i) {
    if (winner || (squares && squares[i])) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  let status;
  if (winner) {
    status = `Vencedor: ${winner}! 🎉`;
  } else if (isTie) {
    status = 'Empate! 🤝';
  } else {
    status = `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className={styles.boardContainer}>
      <div className={styles.status}>{status}</div>
      <div className={styles.grid}>
        {squares && squares.map((squareValue, index) => (
          <Square
            key={index}
            value={squareValue}
            onSquareClick={() => handleClick(index)}
            isWinningSquare={winningLine.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  if (!squares) return null;
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}