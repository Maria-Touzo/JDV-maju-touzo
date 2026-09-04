import styles from './history.module.css';

export default function History({ history }) {
  return (
    <div className={styles.historyContainer}>
      <h3 className={styles.title}>Histórico de Jogadas</h3>
      
      <ol className={styles.list}>
        {history.map((_, move) => {
          const isStart = move === 0;
          const text = isStart ? 'Início do jogo' : `Jogada #${move}`;

          return (
            <li key={move} className={styles.listItem}>
              <span className={styles.moveText}>{text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}