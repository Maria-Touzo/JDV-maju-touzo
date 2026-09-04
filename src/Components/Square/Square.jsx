import styles from './square.module.css';

export default function Square({ value, onSquareClick, isWinningSquare }) {
  const valueClass = value === 'X' ? styles.isX : value === 'O' ? styles.isO : '';
  const winningClass = isWinningSquare ? styles.winningSquare : '';

  return (
    <button 
      type="button" 
      className={`${styles.square} ${valueClass} ${winningClass}`} 
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}