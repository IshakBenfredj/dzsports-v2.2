import React, { useContext, useEffect, useState } from 'react'

import Search from './Search'
import Accounts from './Accounts'

import './style.css'
import UserInfo from './UserInfo'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { hostUrl } from '../../helper'

const Profile = () => {

    const {id} = useParams();
    const [user, setUser] = useState({});

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${hostUrl}getUser/${id}`);
            // console.log(response.data.userFound);
            setUser(response.data.userFound);
            // console.log(user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(()=>{
        fetchUserData()
        document.title = `${user.name}`
    })
    return (
        <>
    <div className=' bg-[#fafafa]'>
        <div className='page flex justify-start align-middle mt-14'>
            <Accounts />
            <UserInfo />
            <Search />
        </div>
    </div>
    </>
    )
}
export default Profile