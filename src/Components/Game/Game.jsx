// src/Components/Game/Game.jsx

import { useState } from 'react';
import Board from '../Board/Board';         // Componente do tabuleiro
import History from '../History/History';     // Componente passivo do histórico
import styles from "./game.module.css";       // Estilos isolados com CSS Modules

export default function Game() {
  // ESTADO GLOBAL 1: Array com o histórico de jogadas do jogo
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  // ESTADO GLOBAL 2: Número do movimento atual
  const [currentMove, setCurrentMove] = useState(0);

  // DERIVAÇÃO DE ESTADO 1: Define se a vez é do jogador 'X'
  const xIsNext = currentMove % 2 === 0;
  
  // DERIVAÇÃO DE ESTADO 2: Extrai o tabuleiro de 9 posições da jogada atual
  const currentSquares = history[currentMove];

  // Callback acionado quando uma nova jogada ocorre no Board
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  return (
    <div className={`container my-4 ${styles['game']}`}>
      <div className="row justify-content-center">
        
        {/* Coluna 1: Tabuleiro (Board) recebendo props padronizadas */}
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-4 mb-md-0">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>

        {/* Coluna 2: Componente do Histórico recebendo a prop history */}
        <div className="col-12 col-md-4">
          <History history={history} />
        </div>

      </div>
    </div>
  );
}