import { useState } from 'react';
import styles from './history.module.css';

export default function History({ history }) {
  const [showHistory, setShowHistory] = useState(false);

  const gameLog = history.map((squares, move) => {
    
    const description = move > 0 ? `Jogada #${move} realizada` : 'Jogo iniciado';

    return (
      <li key={move} className="mb-2">
        
        <span className="text-secondary fw-medium">
          {description}
        </span>
      </li>
    );
  });

  return (
    <div className="d-flex flex-column align-items-center">
      {/* Botão de controle com rótulo em português */}
      <button 
        type="button"
        className="btn btn-secondary my-3"
        onClick={() => setShowHistory(!showHistory)}
      >
        {showHistory ? 'Ocultar histórico' : 'Mostrar histórico'}
      </button>

      {/* Renderização condicional do painel com título em português */}
      {showHistory && (
        <div className={`p-3 bg-white rounded shadow-sm w-100 ${styles['historico__painel']}`}>
          <h3 className="h6 fw-bold mb-3 text-secondary border-bottom pb-2">
            Histórico de Jogadas
          </h3>
          <ul className="list-unstyled mb-0">{gameLog}</ul>
        </div>
      )}
    </div>
  );
}