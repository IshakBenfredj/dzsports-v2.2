import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AdminContext } from '../../context/UserContext';
import { hostUrl } from '../../helper';


const Publish = () => {
    const admin = useContext(AdminContext);
    const [error, setError] = useState('');
    const [jsonMessage, setJsonMessage] = useState('');
    const [post,setPost] = useState({
        description: '',
        image:''
    });

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
      };
    
      const handlePhoto = (e) => {
        setPost({ ...post, [e.target.name]: e.target.files[0] });
      };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', post.description);
        formData.append('image', post.image);
        console.log(post.image);
        console.log(post.description);
        if (post.description || post.image ){
            console.log(post);
            try {
                const response = await axios.post(`${hostUrl}posts/add/${admin._id}`, formData);
                console.log(response.data);
                // clear form state
                setPost({
                    description: '',
                    image:''
                });
                setError('');
                setJsonMessage('تم إضافة المنشور')
            } catch (error) {
                setJsonMessage('')
                console.log(error);
                setError('هناك خطأ ما');
            }
        } else {
            setError('يجب اضافة صورة أو وصف للمنشور');
        }
    }
    useEffect(()=>{
        var fileInput = document.getElementById('imagePost');
        var fileLabel = document.querySelector('.nameOfImg');
        fileInput.addEventListener('change', function() {
        if (fileInput.value) {
            fileLabel.textContent = fileInput.value;
        } else {
            fileLabel.textContent = 'رفع صورة';
        }
        });
    },[])
  return (
    <form className='publish' onSubmit={handleSubmit} encType="multipart/form-data">
        <textarea 
            name="description" id="description" placeholder='أكتب منشورا'
            className=' w-full'
            onChange={handleChange}
            ></textarea>
        <div className="footerPost flex gap-2">
            <input type="file" name="image" accept=".png, .jpg, .jpeg" onChange={handlePhoto} id="imagePost" style={{display:'none'}} />
            <label htmlFor="imagePost" className='nameOfImg'>رفع صورة</label>
            <button>نشر</button>
        </div>
        {error && <div className='error mt-3'>{error}</div>}
        {jsonMessage && <div className='jsonMessage mt-3'>{jsonMessage}</div>}
    </form>
  )
}

export default Publish
