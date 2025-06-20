import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import "./BoardsGrid.css"
import AddBoardModal from './AddBoardModal';
const BoardsGrid = () => {
  const [boards, setBoards] = useState([])
  const [modal, setModal] = useState(<></>)
  useEffect(() => {
    async function fetchBoards() {
      const newBoards = await fetch('http://localhost:3000/boards').then(x => x.json())
      setBoards(newBoards)
    }
    fetchBoards()
  }, [])
  const clearModal = () => {
    setModal(<></>)
  }
  const openModal = () => {
    setModal(<AddBoardModal closeModal={clearModal} appendBoard={appendBoard} />)
  }
  const appendBoard = (board) => {
    let newBoards = []
    for (let i = 0; i < boards.length; i++) {
      newBoards.push(boards[i])
    }
    newBoards.push(board);
    setBoards(newBoards)
  }
  const deleteBoard = async (boardId) => {

    const feedback = await fetch(`http://localhost:3000/boards/${boardId}`, {
      method: "DELETE", headers: {
        'Content-Type': 'application/json', // Indicate the content type of the body
        'Accept': 'application/json' // Indicate the expected response content type
      }
    }).then(x => x.json())
    if (feedback.error) {
      console.error(feedback)
    } else {
      let newBoards = []
      for(let i = 0; i<boards.length; i++){
        if(boards[i].board_id != boardId){
          newBoards.push(boards[i])
        }
      }
      setBoards(newBoards)
    }
  }
  return (
    <div>
      <p>
        <button onClick={openModal}>
          Add New Board
        </button>
      </p>
      <div className='boards-grid'>
        {boards.map(board => (<Board key={board.board_id} jsonData={board} deleteBoard={deleteBoard}></Board>))}
      </div>
      {modal}
    </div>
  );
};

export default BoardsGrid;
