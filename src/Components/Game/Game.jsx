import { useState } from 'react';
import Board from '../Board/Board';         
import History from '../History/History.jsx';    
import styles from "./game.module.css";       

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scores, setScores] = useState({ x: 0, o: 0, ties: 0 });

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function handleGameEnd(winner) {
    if (winner === 'X') {
      setScores(prev => ({ ...prev, x: prev.x + 1 }));
    } else if (winner === 'O') {
      setScores(prev => ({ ...prev, o: prev.o + 1 }));
    } else if (winner === 'tie') {
      setScores(prev => ({ ...prev, ties: prev.ties + 1 }));
    }
  }

  function handleReset() {
    setHistory([Array(9).fill(null)]); 
    setCurrentMove(0);                 
  }

  function handleResetScore() {
    setScores({ x: 0, o: 0, ties: 0 });
    handleReset();
  }

  return (
    <div className={styles.container}>
      {/* Placar Superior */}
      <div className={styles.scoreBoard}>
        <div className={`${styles.scoreCard} ${styles.scoreX}`}>
          <span className={styles.scoreLabel}>Jogador X</span>
          <span className={styles.scoreValue}>{scores.x}</span>
        </div>
        <div className={`${styles.scoreCard} ${styles.scoreTie}`}>
          <span className={styles.scoreLabel}>Empates</span>
          <span className={styles.scoreValue}>{scores.ties}</span>
        </div>
        <div className={`${styles.scoreCard} ${styles.scoreO}`}>
          <span className={styles.scoreLabel}>Jogador O</span>
          <span className={styles.scoreValue}>{scores.o}</span>
        </div>
      </div>

      {/* Área Principal do Jogo */}
      <div className={styles.gameContent}>
        <div className={styles.boardSection}>
          <Board 
            xIsNext={xIsNext} 
            squares={currentSquares} 
            onPlay={handlePlay} 
            onGameEnd={handleGameEnd}
          />
          
          <div className={styles.buttonGroup}>
            <button type="button" className={styles.resetBtn} onClick={handleReset}>
              Reiniciar Partida
            </button>
            <button type="button" className={styles.resetScoreBtn} onClick={handleResetScore}>
              Zerar Placar
            </button>
          </div>
        </div>

        <div className={styles.historySection}>
          <History history={history} />
        </div>
      </div>
    </div>
  );
}