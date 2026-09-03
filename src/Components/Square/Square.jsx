import styles from "./square.module.css"


export default function Square({ value, onSquareClick }) {
  
  return (
    //  Renderiza o botão aplicando a classe modulada e associando o evento de clique vindo do pai
    <button className={styles.square} onClick={onSquareClick}>
      {value}
    </button>
  );
}