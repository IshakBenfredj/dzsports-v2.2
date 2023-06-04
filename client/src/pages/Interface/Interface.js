/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Search from './Search'
import Publish from '../../components/Parts/Publish'
import Post from '../../components/Parts/Post'
import Accounts from './Accounts'

import './style.css'
import { AdminContext } from '../../context/UserContext'
import { hostUrl } from '../../helper'

const Interface = () => {

  const admin = useContext(AdminContext);
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    document.title = 'الرئيسية'
    const getPosts = async () => {
      try {
        const postOfFollowing =[];
        const response = await axios.get(`${hostUrl}posts/get`);
        response.data.posts.forEach(element => {
          if( admin.following && admin.following.includes(element.userId) && !postOfFollowing.includes(response2.data.post)){
            postOfFollowing.push(element);
          }
        });
        const response2 =  await axios.get(`${hostUrl}getAdminPost`)
        if(!postOfFollowing.includes(response2.data.post)){
          postOfFollowing.push(response2.data.post);
        }
        setPosts(postOfFollowing);

      } catch (error) {
        console.error(error);
      }
    };
    getPosts();
  })

  return (
    <>
    <div className=' bg-[#fafafa]'>
      <div className='page flex justify-start align-middle mt-14'>
        <Accounts />
        <div className='posts'>
          <Publish />
          { posts && posts.length !== 0 ?  posts.map( post => post && <Post key={post._id} post={post} /> )
            : <h1 className='noPosts' >هنا تظهر منشورات الذين تتابعهم</h1>
          }
        </div>
        <Search />
      </div>
    </div>
    </>
  )
}

export default Interface


