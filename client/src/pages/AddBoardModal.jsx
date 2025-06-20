import React, { useEffect, useState } from 'react';
import './AddBoardModal.css';
const AddBoardModal = ({ closeModal, appendBoard }) => {
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [type, setType] = useState("Congratulations")
  const [imgId, setImgId] = useState(1)
  const [error, setError] = useState("")
  const bodyClicked = (event) => {
    event.stopPropagation();
  }

  const onNameChange = (event) => {
    setName(event.target.value)
  }
  const onAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const onTypeChange = (event) => {
    setType(event.target.value)
  }
  const shuffleImage = () => {
    setImgId(Math.floor(Math.random() * 80))
  }
  const addBoard = async () => {
    const feedback = await fetch(`http://localhost:3000/boards`, {
      method: "POST", headers: {
        'Content-Type': 'application/json', // Indicate the content type of the body
        'Accept': 'application/json' // Indicate the expected response content type
      }, body: JSON.stringify({
        "author": author,
        "name": name,
        "type": type,
        "img_source": `https://picsum.photos/id/${imgId}/300/200`
      })
    }).then(x => x.json())
    if (feedback.error) {
      console.error(feedback)
      setError(feedback.error)
    } else {
      appendBoard(feedback)
      closeModal();
    }
  }
  return (
    <div className="modal" onClick={closeModal} >
      <div className='add-board-modal-content' onClick={bodyClicked}>
        <p>
          <input value={name} placeholder="Write A Title..." onChange={onNameChange} />
        </p>
        <p>
          <input value={author} placeholder="Write Your Name..." onChange={onAuthorChange} />
        </p>
        <p>
          <select value={type} onChange={onTypeChange}>
            <option>Congratulations</option>
            <option>Thank You</option>
            <option>Inspiration</option>
          </select>
        </p>
        <p>
          <img src={`https://picsum.photos/id/${imgId}/300/200`} />
        </p>
        <p>
          <button onClick={shuffleImage}>New Cover Image</button>
        </p>
        <button onClick={addBoard}>Add Board</button>
        <p className='error'>{error}</p>
      </div>
    </div>
  );
};

export default AddBoardModal;
