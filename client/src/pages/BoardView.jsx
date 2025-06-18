import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Card from '../components/Card';

const BoardView = () => {
  const { boardId } = useParams();
  const [name, setName] = useState('Loading...');
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let data = await fetch(`http://localhost:3000/boards/${boardId}`).then(x => x.json())
      setName(data.name);
      setCards(data.cards);
      console.log(data);
    }
      fetchData();
  },[boardId])
  return (
    <div>
      <p><a href='../../'>Go Back</a></p>
      <h1>{name}</h1>
      <div>
        {cards.map((card) => {return <Card key={card.card_id} jsonData={card}></Card>})}
      </div>
    </div>
  );
};

export default BoardView;
