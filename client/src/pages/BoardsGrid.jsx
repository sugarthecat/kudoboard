import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import "./BoardsGrid.css"
const BoardsGrid = () => {
    const [boards, setBoards] = useState([])
    useEffect( () => {
        async function fetchBoards() {
            const newBoards = await fetch('http://localhost:3000/boards').then(x => x.json())
            setBoards(newBoards)
        }
        fetchBoards()
    }, [])
  return (
    <div>
        <div className='boards-grid'>
        {boards.map(board => (<Board key={board.board_id} jsonData={board}></Board>))}
        </div>
    </div>
  );
};

export default BoardsGrid;
