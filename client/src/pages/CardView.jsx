import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Comment from '../components/Comment.jsx';
import './CardView.css';
const CardView = () => {
  const { cardId } = useParams();
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  useEffect(() => {
    async function fetchData() {
      let data = await fetch(`http://localhost:3000/cards/${cardId}`).then(x => x.json())
      setName(data.name);
      setComments(data.comments);
      console.log(data);
    }
    fetchData();
  }, [cardId]
  );
  return (
    <div>
      <p> {name}
      </p>
      <div class="comments">
        {comments.map((comment) => <Comment jsonData={comment} key={comment.comment_id}/>)}
      </div>
    </div>
  );
};

export default CardView;
