/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import confetti from "canvas-confetti"

import { Square } from "./components/Square";
import { TURNS } from "./constants.jsx";
import { checkWinner } from "./logic/board.jsx"



//NUESTRA APP

function App() {



  //ESTADOS: primera posicion valor de el estado segunda posicion como actualizar el estado.
  //estado inicial board:

  //guardamos en local storage el tablero.
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  });

  //guardamos en local storage el turno.
  const [turn, setTurn] = useState(()=>{
    const turnFromLocalStorage = window.localStorage.getItem('newTurn')
    return turnFromLocalStorage ?? TURNS.X
  });

  //estado nicial para comprovar el ganador.
  const [winner, setWinner] = useState(null);//null no hay ganador false hay empate 


  //COMPROBAR GANADOR-------------------------------------------- 


  //RESETEAR EL JUEGO--------------------------------------------
  //cuando reseteamos el juego nos teneos que asgurar que estamos seteando a los valores iniciales de los estados
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X)
    setWinner(null);

    //cuando reseteamos el juego tambien borramos el local storage 
    window.localStorage.removeItem('board');
    window.localStorage.removeItem('turn');
  }

  //CHEQUEAR EMPATE-----------------------------------------------
  const checkEndGame = (newBoard) => {
    //si todos los square son diferentes a null el juego termino y hay un empate.
    return newBoard.every((square) => square !== null)
  };




  //actualizacion de el board:
  //funcion que se ejecutara dentro de la funcion handleClick cunado se haga click en el square.
  const updateBoard = (index) => {

    //aca le decimos que no actualice esta pocicion si ya tiene algo. para evitar sobreescribir el square.
    //o si ya tenemos un ganador 
    if (board[index] || winner) return


    //actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)


    //si turno esta en x pasa a o y viceversa , y actualizamos el turno (setTurn) con ese resultado (newTurn).
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardamos partida en local storage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', turn)

    //verificamos si hay un ganador con la funcion que creamos para eso.
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti();
      //aqui le decimos que hacer cuando checkWinner encuentre un ganador, este ganador se encuentra en la constante newWinner.
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);// es un empate.
    }
  }









  //RENDERIZADO:
  return (
    <>
      <main className="board">
        <h1>tic tac toe</h1>
        <button onClick={resetGame}>Resetetear el juego</button>
        <secction className="game">
          {
            board.map((square, index) => {
              return (

                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}

                >

                  {square}

                </Square>

              )
            })
          }
        </secction>
        <section className="turn">
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </section>
        {
          winner !== null && (
            <section className="winner">
              <div className="texto">
                <h2>
                  {
                    winner === false ? 'Empate' : 'Ganador'
                  }
                </h2>

                <header className="win">
                  {
                    winner && <Square>
                      {winner}
                    </Square>
                  }
                </header>
                <button onClick={resetGame}>Eempezar de nuevo</button>
                <footer>

                </footer>
              </div>
            </section>
          )
        }
      </main>
    </>
  )
}

export default App
