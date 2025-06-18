import React from 'react';
import "./Board.css"
const Board = ({ jsonData }) => {
  return (
    <a href={`./boards/${jsonData.board_id}`} className='board'>
      <div className='board'>
        <h1>
          {jsonData.name}</h1>
        <h2>by {jsonData.author}</h2>
        <p>{jsonData.type}</p>
        <img src={jsonData.img_source} />
      </div>
      </a>
  );
};

export default Board;
