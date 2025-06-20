import React from 'react';
import "./Board.css"
const Board = ({ jsonData, deleteBoard}) => {
  const removeThis = (event) => {
    event.stopPropagation();
    deleteBoard(jsonData.board_id)
  }
  const redirectToBoard = () =>{
    window.location.href= `./boards/${jsonData.board_id}`
  }
  return (
      <div className='board' onClick={redirectToBoard}>
        <h1>
          {jsonData.name}</h1>
        <h2>by {jsonData.author}</h2>
        <p>{jsonData.type}</p>
        <img src={jsonData.img_source} />
        <div className="delete-button" ><button onClick={removeThis}>Delete</button></div>
      </div>
  );
};

export default Board;
