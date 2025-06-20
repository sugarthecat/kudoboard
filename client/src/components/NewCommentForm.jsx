import React, { useEffect, useState } from 'react';

const NewCommentForm = ({addComment, cardId}) => {
    const [username, setUsername] = useState("")
    const [content, setContent] = useState("")
    const handleUserChange = (event) => {
        setUsername(event.target.value);
    };
    const handleContentChange = (event) => {
        setContent(event.target.value);
    };
    const submitComment = async () => {
        if(content.length == 0){
            alert("Please enter a message to comment!")
            return;
        }
        const feedback = await fetch(`http://localhost:3000/cards/${cardId}`, {
            method: "POST", headers: {
                'Content-Type': 'application/json', // Indicate the content type of the body
                'Accept': 'application/json' // Indicate the expected response content type
            }, body: JSON.stringify({
                "author": username,
                "content": content,
                "card_id": cardId
            })
        }).then(x => x.json())
        if(feedback.error){
            console.error(feedback)
        }else{
            addComment(feedback)
        }
    }
    return (
        <div className='new-comment'>
            <input value={username} onChange={handleUserChange} placeholder='Username' /> <br />
            <textarea value={content} onChange={handleContentChange} placeholder='Your Message Here'></textarea><br />
            <button onClick={submitComment}>Submit</button>
        </div>
    );
};

export default NewCommentForm;
