import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { AdminContext } from '../../context/UserContext'
import userPhoto from '../../assets/user.png'
import  { hostUrl }  from '../../helper';


const Comment = ({comment,postId}) => {

    const [user, setUser] = useState({});
    const admin = useContext(AdminContext);

    const deleteComment = async ()=>{
        const deleteComment = window.confirm('هل ترغب في حذف هذا التعليق ؟');
        if(deleteComment) {
            axios
            .post(`${hostUrl}deleteComment/${postId}/${comment._id}`)
            .then(res => {
                alert(res.data.message);
            })
        }
    }

    useEffect(()=>{
        const fetchUserData = async () => {
        try {
            const response = await axios.get(`${hostUrl}getUser/${comment.userId}`);
            // console.log(response.data.userFound);
            setUser(response.data.userFound);
            // console.log(user);
        } catch (error) {
            console.error(error);
        }
        };
        fetchUserData();
    },[user])
  return (
    <div className='comment'>
        <div className="commentHead">
            <div className="commentUser">
                { user.photoProfile ? <img 
                    src={`${hostUrl}uploads/${user.photoProfile}`}
                    alt={`Img of Profile`}
                    className='postPhotoProfile'
                />
                : <img src={userPhoto}
                    alt={`Img of Profile`}
                    className='postPhotoProfile'
                />
                }
                <div>
                    <h4>{user.name}</h4>
                    <small>{formatDistanceToNow(new Date(comment.createdDate), { addSuffix: true })}</small>
                </div>
            </div>
            {
                admin._id === comment.userId && <div className="deleteIcon"> <i className="uil uil-trash-alt text-4xl cursor-pointer" onClick={deleteComment}></i></div>
            }
        </div>
        <div className="commentText">{comment.comment}</div>
    </div>
  )
}

export default Comment