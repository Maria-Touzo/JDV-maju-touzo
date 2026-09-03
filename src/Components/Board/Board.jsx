

import Square from '../Square/Square';
import styles from"./board.module.css";


export default function Board({ xIsNext, squares, onPlay }) {
  // Lógica de clique nos quadrados
  function handleClick(i) {
    // // Se já houver um vencedor ou se o quadrado estiver ocupado, ignora o clique
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // Cria uma cópia do array do tabuleiro para manter a imutabilidade
    const nextSquares = squares.slice();

    // Marca 'X' ou 'O' dependendo do turno atual
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    // Envia o novo estado do tabuleiro para o componente pai (Game)
    onPlay(nextSquares);
  }

  // Verificação de vencedor ou mensagem de status
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Vencedor: ' + winner;
  } else {
    status = 'Próximo jogador: ' + (xIsNext ? 'X' : 'O');
  }

  // Renderiza a estrutura visual do tabuleiro em JSX
  return (
    <>
      <div className={styles['board__status']}>{status}</div>
      <div className={styles['board__grid']}>
        <div className={styles['board__row']}>
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className={styles['board__row']}>
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className={styles['board__row']}>
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </>
  );
} 

// Função auxiliar que checa as 8 combinações possíveis de vitória
function calculateWinner(squares) {
  // Lista com todas as posições vencedoras (linhas, colunas e diagonais)
  const lines = [
   [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
    [0, 4, 8], [2, 4, 6]             // Diagonais
  ];

  // Percorre a lista de combinações para verificar se alguém venceu
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}