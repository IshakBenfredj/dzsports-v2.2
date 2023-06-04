import { useContext, useState } from 'react';
import { AdminContext } from '../../context/UserContext';
import Comment from './Comment';
import { hostUrl } from '../../helper';
import axios from 'axios';

const CommentsPopup = ({ onClose,comments,post }) => {

    const admin = useContext(AdminContext);
    const [comment, setComment] = useState('');  
    const [cmessage, setCMessage] = useState('');

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
    return (
        <div className="popup-container inset-0">
            <div className="popup-content bg-white rounded-lg p-6">
                <div className="popup-header flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">التعليقات <small className='text-xl'>{comments.length}</small></h2>
                    <span
                        onClick={onClose}
                    >
                        ×
                    </span>
                </div>
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
                <div className="popup-comments space-y-4">
                    {comments ? comments.slice().reverse().map(comment => <Comment key={comment._id} comment={comment} postId={post._id} />) 
                    : <h2 className='text-center font-bold text-2xl'>ليس هناك تعليقات</h2>}
                </div>
            </div>
        </div>
    );
};

export default CommentsPopup;