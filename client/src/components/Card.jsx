import React, { useState } from 'react';
import "./Card.css";
import CardModal from '../pages/CardModal';
const Card = ({ jsonData, upvoted, togglePin }) => {
    const upvote = async (event) => {
        event.stopPropagation()
        fetch(`http://localhost:3000/cards/${jsonData.card_id}/upvote`,
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
        console.log(0)
        setModal(<></>);
        console.log(modal)
    }
    const removeCard = (event) => {
        event.stopPropagation();

    }
    const showModal = () => {
        setModal(<CardModal closeModal={closeModal} cardId={jsonData.card_id} cardObj={jsonData} />)
    }
    const changePinStatus = (event) => {
        event.stopPropagation();
        togglePin(jsonData.card_id)
    }
    return (
        <div className={`${ jsonData.isPinned ? "pinned" : ""}`}>
            <div className={`card`} onClick={showModal}>
                <div className='card-content'>
                    <div>
                        <h3>{jsonData.name}</h3>
                        <p>By {jsonData.author}</p>
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
