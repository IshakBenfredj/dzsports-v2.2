import React, { useEffect, useState } from 'react'
import userPhoto from '../../assets/user.png'
import axios from 'axios';
import { hostUrl } from '../../helper.js'


const Notification = ({notification}) => {
    const [user, setUser] = useState({});

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`${hostUrl}getUser/${notification.id}`);
            // console.log(response.data.userFound);
            setUser(response.data.userFound);
            // console.log(user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserData();
    });

  return (
    <div className='notification'>
        <img src={user.photoProfile ? `${hostUrl}uploads/${user.photoProfile}` : userPhoto} alt="userPhotoProfile" />
        <a href={`/dzsports/profile/${notification.id}`}>{notification.message}</a>
    </div>
  )
}

export default Notification