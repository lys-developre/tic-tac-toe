export const Square = ({ children, isSelected, updateBoard, index }) => {

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