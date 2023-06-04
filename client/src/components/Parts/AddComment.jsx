import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { hostUrl } from '../../helper'
import { AdminContext } from '../../context/UserContext';

const AddComment = (post) => {

  const admin = useContext(AdminContext);
  const [comment, setComment] = useState('');  
  const [commentPost, setCommentPost] = useState({});  
  const [message, setMessage] = useState('');

  const addComment = async (e) => {
    e.preventDefault();
    console.log('postId: ', post.postId);
    console.log('userId: ', post.userId);
    console.log('admin: ',admin);
    console.log('???: ',admin._id !== post.userId);
    const createdDate = new Date();
    const notification = {
      id: admin._id,
      message: `قام ${admin.name} بالتعليق على منشورك`
    };
    if(comment) {
      await axios.post(`${hostUrl}addComment/${post.postId}`,{userId: admin._id,comment,createdDate})
      .then(res => {setMessage(res.data.message)})
      if(post.userId !== admin._id){
        await axios.post(`${hostUrl}newNotify/${post.userId}`,notification);
      }
    }
  }

  useEffect(()=>{
    const getPostById = async ()=>{
      await axios.get(`${hostUrl}post/get/${post.postId}`)
      .then(res => setCommentPost(res.data.post));
    }
    getPostById()
  })

  return (
    <>
      {message && <div className='jsonMessage'>{message}</div>}
      <form className='addComment flex align-middle' onSubmit={addComment}>
        <textarea 
          name="comment" 
          placeholder='أكتب تعليقا' 
          value={comment}
          onChange={(e)=>{setComment(e.target.value)}}>
        </textarea>
        <button>تعليق</button>
      </form>
    </>
  )
}

export default AddComment