import React, { useEffect, useState } from 'react';
import './AddCardModal.css';
const AddCardModal = ({ closeModal, board_id, addCardToBoard }) => {
  const [name, setName] = useState("")
  const [author, setAuthor] = useState("")
  const [textContent, setTextContent] = useState("")
  const [gifSource, setGifSource] = useState("https://media2.giphy.com/media/v1.Y2lkPTlkNTRiNGMzZXlqcWhwZjI4YnF2M2xoMjQ4OTVvZHY0MHM4aGljcmZydmh6dDVweCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YRtLgsajXrz1FNJ6oy/giphy.gif")
  const [searchPrompt, setSearchPrompt] = useState("Cats")
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
  const onTextContentChange = (event) => {
    setTextContent(event.target.value)
  }
  const addCard = async () => {
    const feedback = await fetch(`${import.meta.env.VITE_HOST_URL}/boards/${board_id}`, {
      method: "POST", headers: {
        'Content-Type': 'application/json', // Indicate the content type of the body
        'Accept': 'application/json' // Indicate the expected response content type
      }, body: JSON.stringify({
        "author": author,
        "name": name,
        "text_content": textContent,
        "gif_source": gifSource
      })
    }).then(x => x.json())
    if (feedback.error) {
      console.error(feedback)
      setError(feedback.error)
    } else {
      addCardToBoard(feedback)
      closeModal();
    }
  }
  const apiKey = import.meta.env.VITE_GIPHY_KEY
  const searchForGif = async () => {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchPrompt.replaceAll(" ", "%20")}`).then(res => res.json())
    if (response.data.length > 0) {
      setGifSource(response.data[0].images.original.url);
    }
  }
  const updateSearchPrompt = (event) => {
    setSearchPrompt(event.target.value)
  }
  return (
    <div className="modal" onClick={closeModal} >
      <div className='modal-content' onClick={bodyClicked}>
        <h1>Add Card</h1>
        <p>
          <input value={name} placeholder="Write A Title..." onChange={onNameChange} />
        </p>
        <p>
          <input value={author} placeholder="Write Your Name..." onChange={onAuthorChange} />
        </p>
        <textarea value={textContent} onChange={onTextContentChange} />
        <p>GIF Search Prompt:
          <input
            value={searchPrompt}
            onChange={updateSearchPrompt}
            onKeyDown={function (event) {
              if (event.key == "Enter") {
                event.preventDefault();
                searchForGif();
              }
            }}
          />
          <button onClick={searchForGif}>Search</button></p>
        <div>
          <img src={gifSource} alt="Giphy" className='giphy-gif' />
          <p>
            <a href="https://giphy.com">via GIPHY</a>
          </p>
        </div>
        <button onClick={addCard}>Add Card</button>
        <p className='error'>{error}</p>
      </div>
    </div>
  );
};

export default AddCardModal;
