import React from 'react';

const Card = ({jsonData}) => {
  return (
    <div>
        <a href={`../../cards/${jsonData.card_id}`}>
        <h3>{jsonData.name}</h3>
        </a>
        <p>By {jsonData.author}</p>
    </div>
  );
};

export default Card;
