import React from 'react';
import "./Comment.css"
const Comment = ({ jsonData, removeComment }) => {
    const deleteComment = async () => {

        const feedback = await fetch(`${import.meta.env.VITE_HOST_URL}/comments/${jsonData.comment_id}`, {
            method: "DELETE", headers: {
                'Content-Type': 'application/json', // Indicate the content type of the body
                'Accept': 'application/json' // Indicate the expected response content type
            }
        }).then(x => x.json())
        if (feedback.error) {
            console.error(feedback)
        } else {
            removeComment(jsonData.comment_id)
        }
    }
    return (
        <div className='comment'>
            <h2>{jsonData.author}</h2>
            <p>{jsonData.content}</p>
            <button onClick={deleteComment}>Delete Comment</button>
        </div>
    );
};

export default Comment;
