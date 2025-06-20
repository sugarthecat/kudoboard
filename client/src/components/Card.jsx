import React, { useState } from 'react';
import "./Card.css";
import CardModal from '../pages/CardModal';
const Card = ({ jsonData, upvoted, togglePin, deleteCard }) => {
    const upvote = async (event) => {
        event.stopPropagation()
        fetch(`${import.meta.env.VITE_HOST_URL}/cards/${jsonData.card_id}/upvote`,
            {
                method: "PUT", headers: {
                    'Content-Type': 'application/json', // Indicate the content type of the body
                    'Accept': 'application/json' // Indicate the expected response content type
                }
            }).then(response => {
                if (!response.ok) { // Check if the response status is not OK (e.g., 4xx or 5xx)
                    console.error(`HTTP error! status: ${response.status}`);
                }
            })
        upvoted();
    }
    const [modal, setModal] = useState(<></>)
    const closeModal = () => {
        setModal(<></>);
    }
    const removeCard = async (event) => {
        event.stopPropagation();
        const response = await fetch(`${import.meta.env.VITE_HOST_URL}/cards/${jsonData.card_id}`,
            {
                method: "DELETE", headers: {
                    'Content-Type': 'application/json', // Indicate the content type of the body
                    'Accept': 'application/json' // Indicate the expected response content type
                }
            })
        if (response.ok) {
            deleteCard(jsonData.card_id)
        }else{
            console.error(response)
        }
    }
    const showModal = () => {
        setModal(<CardModal closeModal={closeModal} cardId={jsonData.card_id} cardObj={jsonData} />)
    }
    const changePinStatus = (event) => {
        event.stopPropagation();
        togglePin(jsonData.card_id)
    }
    return (
        <div className={`${jsonData.isPinned ? "pinned" : ""}`}>
            <div className={`card`} onClick={showModal}>
                <div className='card-content'>
                    <div>
                        <h3>{jsonData.name}</h3>
                        <h4>{jsonData.author.length == 0 ? "" : `By ${jsonData.author}`}</h4>
                        <p>{jsonData.text_content}</p>
                    </div>
                    <img src={jsonData.gif_source} />
                </div>
                <div className='upvote-button'>
                    <button onClick={upvote} >
                        Upvote ({jsonData.upvotes})
                    </button>
                </div>
                <div className='delete-button' onClick={removeCard}>
                    <button>
                        Delete
                    </button>
                </div>
                <div className='pin'>
                    <button onClick={changePinStatus}>
                        {jsonData.isPinned ? "Unpin" : "Pin"}
                    </button>
                </div>
            </div>
            {modal}
        </div>
    );
};

export default Card;
