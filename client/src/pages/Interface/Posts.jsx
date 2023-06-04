import React, { useEffect, useState } from 'react'
import './style.css'
import Post from '../../components/Parts/Post'
import Publish from '../../components/Parts/Publish'
import axios from 'axios'
import { hostUrl } from '../../helper'


const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${hostUrl}posts/get`);
        setPosts(response.data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  },[]);
  return (
    <div className='posts'>
      <Publish />
      {posts && posts.map( post => <Post key={post._id} post={post} />)}
    </div>
  )
}

export default Posts



