import React, { useEffect, useState } from 'react';
import Board from '../components/Board';
import "./BoardsGrid.css"
import AddBoardModal from './AddBoardModal';
const BoardsGrid = () => {
  const [boards, setBoards] = useState([])
  const [modal, setModal] = useState(<></>)
  const [filter, setFilter] = useState("All")
  const [searchBarContent, setSearchBarContent] = useState("")
  const [searchPrompt, setSearchPrompt] = useState("")
  async function fetchBoards(filter, searchPrompt) {

    const basePrompt = `http://localhost:3000/boards?filter=${filter.replaceAll(" ", "%20")}`
    let searchTerm = searchPrompt == "" ? "" : `&searchPrompt=${searchPrompt.replaceAll(" ", "%20")}`
    let finalSearchPrompt = basePrompt + searchTerm
    const newBoards = await fetch(finalSearchPrompt).then(x => x.json())
    setBoards(newBoards)
  }
  useEffect(() => {
    fetchBoards(filter, searchPrompt)
  }, [])
  const clearModal = () => {
    setModal(<></>)
  }
  const openModal = () => {
    setModal(<AddBoardModal closeModal={clearModal} appendBoard={appendBoard} />)
  }
  const appendBoard = (board) => {
    let newBoards = []
    newBoards.push(board);
    for (let i = 0; i < boards.length; i++) {
      newBoards.push(boards[i])
    }
    setBoards(newBoards)
  }
  const deleteBoard = async (boardId) => {
    const prompt = `http://localhost:3000/boards/${boardId}`
    const feedback = await fetch(prompt, {
      method: "DELETE", headers: {
        'Content-Type': 'application/json', // Indicate the content type of the body
        'Accept': 'application/json' // Indicate the expected response content type
      }
    }).then(x => x.json())
    if (feedback.error) {
      console.error(feedback)
    } else {
      let newBoards = []
      for (let i = 0; i < boards.length; i++) {
        if (boards[i].board_id != boardId) {
          newBoards.push(boards[i])
        }
      }
      setBoards(newBoards)
    }
  }
  const updateFilter = (event) => {
    setFilter(event.target.value)
    fetchBoards(event.target.value, searchPrompt)
  }
  const clearSearch = async () => {
    setSearchBarContent("")
    setSearchPrompt("")
    setFilter("All")
    fetchBoards("All", "")
  }
  const runSearch = async () => {
    setSearchPrompt(searchBarContent)
    fetchBoards(filter, searchBarContent)
  }
  const updateSearchBarContent = (event) => {
    setSearchBarContent(event.target.value)
  }
  return (
    <div>
      <div className='search-area'>
        <p>Search:
          <input
            value={searchBarContent}
            onChange={updateSearchBarContent}
            onKeyDown={function (event) {
              if (event.key == "Enter") {
                event.preventDefault();
                runSearch();
              }
            }}
          />
        </p>
        <p><button onClick={clearSearch}>Clear</button><button onClick={runSearch}>Search</button></p>
        <p>Filter:
          <select value={filter} onChange={updateFilter}>
            <option value="All">All</option>
            <option value="Recent">Recent</option>
            <option value="Congratulations">Congratulations</option>
            <option value="Thank You">Thank You</option>
            <option value="Inspiration">Inspiration</option>
          </select>
        </p>
      </div>
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
