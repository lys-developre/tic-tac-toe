/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";



//----------------------------------------------------------------

//CONSTANTES:
//constante que contiene los turnos de el juego
const TURNS = {
  X: 'x',
  O: 'o'
}


//----------------------------------------------------------------

//COMPONENTE SQUARE
//creamos el componente square que es cada cuadradito de el juego
//children es el contenido de cada cuadradito inicia en null pero lo vamos a ir cambiando por x o por o.
//updateBoard lo usaremos para cuando hagamos click actualizar el cuadradito con una x o una o.
//index lo usaremos como key al momento de renderizar.
const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = ` square ${isSelected ? 'is-selected' : ''} `

  //manejamos el click :
  const handleClick = () => {
    updateBoard(index);
  }

  return (

    <div onClick={handleClick} className={className} >
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];


//----------------------------------------------------------------
//NUESTRA APP

function App() {

  //ESTADOS: primera posicion valor de el estado segunda posicion como actualizar el estado.

  //estado inicial board:
  const [board, setBoard] = useState(Array(9).fill(null));

  //estado inicial turn:
  const [turn, setTurn] = useState(TURNS.X);

  //estado nicial para comprovar el ganador.
  const [winner, setWinner] = useState(null);//null no hay ganador false hay empate 


  //comprobamos quien es el ganador 
  const checkWinner = (boardToCheck) =>{
    for(const combo of WINNER_COMBOS){
      const [a, b, c] = combo

      if(
        boardToCheck[a] && 
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[b] === boardToCheck[c]         
      ){
        return boardToCheck[a]
      }
    }
    //si no hay ganador.
    return null
  }





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

    //verificamos si hay un ganador con la funcion que creamos para eso.
    const newWinner = checkWinner(newBoard)
    if (newWinner){
      //aqui le decimos que hacer cuando checkWinner encuentre un ganador, este ganador se encuentra en la constante newWinner.
      
      setWinner(newWinner);


    }

  }





  //RENDERIZADO:
  return (
    <>
      <main className="board">
        <h1>tic tac toe</h1>
        <secction className="game">
          {
            board.map((_, index) => {
              return (

                <Square
                  key={index}
                  index={index}
                  updateBoard={updateBoard}

                >

                  {board[index]}

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
      </main>
    </>
  )
}

export default App
