import React from 'react';

const Comment = ({jsonData}) => {
  return (
    <div>
        <h2>{jsonData.author}</h2>
        <p>{jsonData.content}</p>
    </div>
  );
};

export default Comment;
