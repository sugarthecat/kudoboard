import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '../components/Card';
import "./BoardView.css"
import AddCardModal from './AddCardModal';
const BoardView = () => {
  const { boardId } = useParams();
  const [name, setName] = useState('Loading...');
  const [author, setAuthor] = useState('Loading...');
  const [type, setType] = useState('Loading...');
  const [cards, setCards] = useState([]);
  const [modal, setModal] = useState(<></>);
  async function fetchData() {
    let data = await fetch(`${import.meta.env.VITE_HOST_URL}/boards/${boardId}`).then(x => x.json())
    setName(data.name);
    setAuthor(data.author);
    setType(data.type);
    setCards(data.cards);
  }
  const changeUpvotes = (cardId, upvoteCount) => {
    let newCards = []
    for (let i = 0; i < cards.length; i++) {
      newCards.push(cards[i])
      if (cards[i].card_id == cardId) {
        newCards[i].upvotes = upvoteCount
      }
    }
    setCards(newCards)
  }
  const clearModal = () => {
    setModal(<></>)
  }
  const openAddCardModal = () => {
    setModal(<AddCardModal addCardToBoard={addCard} board_id={boardId} closeModal={clearModal} />)
  }
  useEffect(() => {
    fetchData();
  }, [boardId])
  const togglePin = async (cardId) => {

    let feedback = await fetch(`${import.meta.env.VITE_HOST_URL}/cards/${cardId}/pinned`,
      {
        method: "PUT", headers: {
          'Content-Type': 'application/json', // Indicate the content type of the body
          'Accept': 'application/json' // Indicate the expected response content type
        }
      })

    let newCards = []
    for (let i = 0; i < cards.length; i++) {
      newCards.push(cards[i])
      if (cards[i].card_id == cardId) {
        newCards[i].isPinned = !newCards[i].isPinned
      }
    }
    setCards(newCards)
  }

  const deleteCard = (cardId) => {
    let newCards = []
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].card_id != cardId) {
        newCards.push(cards[i])
      }
    }
    setCards(newCards)
  }

  const addCard = (cardObj) => {
    let newCards = []
    for (let i = 0; i < cards.length; i++) {
        newCards.push(cards[i])

    }
    newCards.push(cardObj)
    setCards(newCards)
  }
  return (
    <div>
      <p><a href='../../'>Go Back</a></p>
      <h1>{name}</h1>
      <h2>{author == "" ? "" : `By ${author}`}</h2>
      <p>{type}</p>
      <p>
        <button onClick={openAddCardModal}>Add New Card</button>
      </p>
      <div className='cards-grid'>
        {cards.map((card) => {
          let cardId = card.card_id
          const upvoted = () => {
            changeUpvotes(cardId, card.upvotes + 1)
          }
          return <Card key={card.card_id} jsonData={card} upvoted={upvoted} togglePin={togglePin} deleteCard={deleteCard}></Card>
        })}
      </div>
      {modal}
    </div>
  );
};

export default BoardView;
