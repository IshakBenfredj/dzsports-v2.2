import React, { useContext, useEffect, useState } from 'react'
import commentImg from '../../assets/comment.png'
import jam from '../../assets/jam.png'
import redjam from '../../assets/redjam.png'
import follow from '../../assets/follow.png'
import dejafollow from '../../assets/dejafollow.png'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import axios from 'axios'
import { AdminContext } from '../../context/UserContext'
import CommentsPopup from './CommentsPopup'
import { hostUrl } from '../../helper'

const Post = ({post}) => {

  const admin = useContext(AdminContext);
  const [user, setUser] = useState({});
  const [comment, setComment] = useState('');  
  const [message, setMessage] = useState('');
  const [cmessage, setCMessage] = useState('');

  // Comments Show
  const [showCommentsPopup, setShowCommentsPopup] = useState(false);
  const openCommentsPopup = () => {
    setShowCommentsPopup(true);
  };
  const closeCommentsPopup = () => {
    setShowCommentsPopup(false);
  };
  
  // HANDLE POST

  const removePost = async () => {
    const confirmed = window.confirm('هل تريد حذف المنشور ؟');
    if (confirmed) {
      await axios.delete(`${hostUrl}post/delete/${post._id}`)
      .then(res => alert(res.data.message))
    }
  }

  const handleJam = async (e) => {
    if(e.target.src === jam) {
      const notification = {
        id: admin._id,
        message: `قام ${admin.name} بالاعجاب بمنشورك`
      };
      e.target.src = redjam;
      await axios.post(`${hostUrl}addJam/${post._id}/${admin._id}`);
      if(admin._id !== user._id){
        await axios.post(`${hostUrl}newNotify/${user._id}`,notification);
      }
    } else {
      e.target.src = jam
      await axios.post(`${hostUrl}incJam/${post._id}/${admin._id}`);
    }
  }

  // HANDLE FOLLOWERS AND FOLLOWINGS
  const handleFollow = async () => {
    try {
        const notification = {
            id: admin._id,
            message: `قام ${admin.name} بمتابعتك`
        };
        const response = await axios.post(`${hostUrl}follow/${user._id}/${admin._id}`,notification);
        await axios.post(`${hostUrl}newNotify/${user._id}`,notification);
        // console.log(response.data);
        // console.log(response.data.userA);
        // console.log(response.data.userB);
        setMessage(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const unFollow = async () => {
    try {
        const response = await axios.post(`${hostUrl}unfollow/${user._id}/${admin._id}`);
        setMessage(response.data.message);
    } catch (error) {
        console.error(error);
    }
  };

  // ADD COMMENTS
  const addComment = async (e) => {
    e.preventDefault();
    const createdDate = new Date();
    const notification = {
      id: admin._id,
      message: `قام ${admin.name} بالتعليق على منشورك`
    };
    if(comment) {
      await axios.post(`${hostUrl}addComment/${post._id}`,{userId: admin._id,comment,createdDate})
      .then(res => {setCMessage(res.data.message);setComment('')})
      if(post.userId !== admin._id){
        await axios.post(`${hostUrl}newNotify/${post.userId}`,notification);
      }
    }
  }

  useEffect(()=>{
    const fetchUserData = async () => {
      try {
          const response = await axios.get(`${hostUrl}getUser/${post.userId}`);
          // console.log(response.data.userFound);
          setUser(response.data.userFound);
          // console.log(user);
      } catch (error) {
          console.error(error);
      }
    };
    fetchUserData();
  })

  return (
    <div className="post w-full">
      {message && <div className='jsonMessage'>{message}</div>}
      <div className="headPost flex align-middle justify-between">
        <div className="rightPart flex align-middle">
          { user.photoProfile ? <img 
            src={`${hostUrl}uploads/${user.photoProfile}`}
            alt={`Img of Profile`}
            className='postPhotoProfile'
            />
          : <i className="userIcon uil uil-user-circle"></i>
          }
          <div className="info flex flex-col justify-center mr-2">
            <span className='text-lg block'>{user.name}</span>
            <span className='text-xs' style={{direction:'ltr'}}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</span>
          </div>
        </div>
        <div className="leftPart">
          {admin._id === user._id ? <i className="uil uil-trash-alt text-4xl cursor-pointer" onClick={removePost}></i>
          : admin.following && admin.following.includes(user._id) ? <img src={dejafollow} onClick={unFollow} alt="User PhotoProfile" />: <img src={follow} onClick={handleFollow} alt="User PhotoProfile" />}
        </div>
      </div>
      <div className="description mb-4">
        {post.description}
      </div>
        {post.image && <img 
          src={`${hostUrl}uploads/${post.image}`}
          alt={`Img of ${post.description}`}
      />}
      <div className="react">
        {post.likes.includes(admin._id) ? 
          <img src={redjam}
            onClick={handleJam}
            alt="jam" 
          /> : 
            <img src={jam}
            onClick={handleJam}
            alt="jam" 
          />
        }
        <span>{post.likes.length}</span>
        <img src={commentImg}
          alt="comment" 
          onClick={openCommentsPopup}
        />
        <span>{post.comments.length}</span>
      </div>
      <div>
        <div>
          {cmessage && <div className='jsonMessage'>{cmessage}</div>}
          <form className='addComment flex align-middle' onSubmit={addComment}>
            <textarea 
              name="comment" 
              placeholder='أكتب تعليقا' 
              value={comment}
              onChange={(e)=>{setComment(e.target.value)}}>
            </textarea>
            <button>تعليق</button>
          </form>
        </div>
      </div>
      {showCommentsPopup && <CommentsPopup onClose={closeCommentsPopup} comments={post.comments} post={post} />}
    </div>
  )
}

export default Post