import Board from './Board.jsx';


export default function Game() {
 
  const [history, setHistory] = useState([Array(9).fill(null)]);
  
  const [currentMove, setCurrentMove] = useState(0);

  
  const xIsNext = currentMove % 2 === 0;
  
  const currentSquares = history[currentMove];

  
  function handlePlay(nextSquares) {
   
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    
    setCurrentMove(nextHistory.length - 1);
  }

  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Ir para a jogada #' + move;
    } else {
      description = 'Ir para o início do jogo';
    }
    return (
      <li key={move} className="mb-2">
       
        <button 
          className="btn btn-outline-primary btn-sm" 
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    
    <div className={`container my-4 ${styles['game']}`}>
      <div className="row justify-content-center">
       
        <div className="col-12 col-md-6 d-flex flex-column align-items-center mb-4 mb-md-0">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
        </div>

        
        <div className={`col-12 col-md-4 ${styles['game__info']}`}>
          <h3 className="h5 fw-bold mb-3">Histórico de Jogadas</h3>
          <ol className="ps-3">{moves}</ol>
        </div>
      </div>
    </div>
  );
}