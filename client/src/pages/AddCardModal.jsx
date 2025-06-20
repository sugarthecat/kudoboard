import React, { useEffect, useState } from 'react';
import './AddCardModal.css';
const AddCardModal = ({ closeModal }) => {
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("!")
  const bodyClicked = (event) => {
    event.stopPropagation();
  }

  const onNameChange = (event) => {
    setName(event.target.value)
  }
  const onTypeChange = (event) => {
    setType(event.target.value)
  }
  const addCard = () =>
  {

  }
  return (
    <div className="modal" onClick={closeModal} >
      <div className='add-card-modal-content' onClick={bodyClicked}>
        <h1>Add Card</h1>
        <p>
          <input value={name} placeholder="Write A Title..." onChange={onNameChange} />
        </p>
        <p>
          <input value={name} placeholder="Write Your Name..." onChange={onNameChange} />
        </p>
        <button onClick={addCard}>Add Card</button>
      </div>
    </div>
  );
};

export default AddCardModal;
