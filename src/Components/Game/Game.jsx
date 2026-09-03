
import { useState } from 'react';
import Board from '../Board/Board';         
import History from '../History/History.jsx';    
import styles from "./game.module.css";       

export default function Game() {
  //  Armazena o histórico do jogo como um array de matrizes de 9 posições
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // Controla o índice numérico da jogada que está sendo visualizada
  const [currentMove, setCurrentMove] = useState(0);

  // Define se é a vez do jogador 'X' (jogadas pares são do 'X')
  const xIsNext = currentMove % 2 === 0;
  // Resgata a matriz de 9 posições correspondente ao movimento atual
  const currentSquares = history[currentMove];

//  // Callback chamado pelo Board quando uma nova jogada é realizada
  function handlePlay(nextSquares) {
    // Cria um novo histórico mantendo até a jogada atual e adicionando o novo estado do tabuleiro
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Atualiza o estado do histórico com a nova lista
    setHistory(nextHistory);
    // Atualiza o índice para apontar sempre para a última jogada feita
    setCurrentMove(nextHistory.length - 1);
  }

 // Função responsável por reiniciar a partida e resetar os estados
  function handleReset() {
    // Redefine o histórico para apenas uma matriz de 9 posições nulas
    setHistory([Array(9).fill(null)]); 
    // Zera o ponteiro do movimento para o início do jogo
    setCurrentMove(0);                 
  }

  
  return (
    <div className={`container my-4 ${styles['game']}`}>
      <div className="row justify-content-center">
        
       
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-4 mb-md-0">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          
          
          <button 
            type="button" 
            className="btn btn-danger mt-3" 
            onClick={handleReset}
          >
            Reiniciar Jogo
          </button>
        </div>

       
        <div className="col-12 col-md-4">
          <History history={history} />
        </div>

      </div>
    </div>
  );
} 