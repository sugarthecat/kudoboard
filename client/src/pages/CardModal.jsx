import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comment from '../components/Comment.jsx';
import './CardModal.css';
import NewCommentForm from '../components/NewCommentForm.jsx';
const CardModal = ({ cardId, cardObj, closeModal }) => {
  const [comments, setComments] = useState([])
  useEffect(() => {
    async function fetchData() {
      let data = await fetch(`http://localhost:3000/cards/${cardId}`).then(x => x.json())
      setComments(data.comments);
      console.log(data);
    }
    fetchData();
  }, [cardId]
  );
  const bodyClicked = (event) => {
    event.stopPropagation();
  }
  const addComment = (comment) => {
    let newComments = []
    for (let i = 0; i < comments.length; i++) {
      newComments.push(comments[i])
    }
    newComments.push(comment)
    setComments(newComments)
  }
  const removeComment = (commentId) => {
    let newComments = []
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].comment_id != commentId) {
        newComments.push(comments[i])
      }
    }
    setComments(newComments)
  }
  return (
    <div className="modal" onClick={closeModal} >
      <div className='card-modal-content' onClick={bodyClicked}>
        <h1>{cardObj.name}</h1>
        <p> By {cardObj.author}</p>
        <img src={`${cardObj.gif_source}`}/>
        <div className='comment-section'>
          {comments.map((comment) => <Comment key={comment.comment_id} removeComment={removeComment} jsonData={comment} />
          )}
        </div>
        <NewCommentForm addComment={addComment} cardId={cardId} />
      </div>
    </div>
  );
};

export default CardModal;
