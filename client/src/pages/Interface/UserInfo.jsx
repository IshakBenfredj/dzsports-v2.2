import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import { HashLink as Link } from 'react-router-hash-link';




// IMPORT PHOTOS
import userPhoto from '../../assets/user.png'
import newPhoto from '../../assets/camera.png'
import follow from '../../assets/follow.png'
import dejafollow from '../../assets/dejafollow.png'
import Publish from '../../components/Parts/Publish';
import Post from '../../components/Parts/Post';
import axios from 'axios';
import { AdminContext } from '../../context/UserContext';
import { hostUrl } from '../../helper';

const UserInfo = () => {

    const admin = useContext(AdminContext);
    const [user, setUser] = useState({});
    const {id} = useParams();
    const [posts, setPosts] = useState([]);
    const [photoProfile, setPhotoProfile] = useState('');
    const [message, setMessage] = useState('');

    const handlePhoto = (e) => {
        setPhotoProfile(e.target.files[0]);
        setMessage('');
        document.querySelector('.photoObligat').innerHTML = `هل تريد تغيير الصورة الى ${document.querySelector('#photoProfile').value}`
    }

    // CHANGE PHOTO PROFILE 
    const changePhotoProfile = async (e) => {
        e.preventDefault();
        if (photoProfile) {
        const formData = new FormData();
        formData.append('image',photoProfile);
        console.log(formData);
        // setMessage('');
        try {
            const response = await axios.post(`${hostUrl}posts/add/${admin._id}`, formData);
            const response2 = await axios.post(`${hostUrl}changephotoprofile/${admin._id}`, formData);
            // fetchData();
            // fetchUserData();
            console.log(response.data);
            console.log(response2.data);
            // clear form state
            setPhotoProfile('');
            setMessage();
            document.querySelector('.photoObligat').innerHTML = `<div class='jsonMessage'>تم تغيير الصورة بنجاح</div>`
            localStorage.setItem('user',JSON.stringify(response2.data))
        } catch (error) {
            console.log(error);
        }
        } else {
            document.querySelector('.photoObligat').innerHTML = 'عليك اختيار صورة أولا '
        }
    }

    // HANDLE FOLLOWERS AND FOLLOWINGS
    const handleFollow = async () => {
        try {
            const notification = {
                id: admin._id,
                message: `قام ${admin.name} بمتابعتك`
            };
            const response = await axios.post(`${hostUrl}follow/${user._id}/${admin._id}`);
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
        console.log('kl klds');
        try {
            const response = await axios.post(`${hostUrl}unfollow/${user._id}/${admin._id}`);
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };
    
    
    useEffect(() => {
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
        const fetchData = async () => {
            try {
                const response = await axios.get(`${hostUrl}posts/getById/${id}`);
                setPosts(response.data.posts);
                // console.log(response.data.posts);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUserData();
        fetchData();
    });
    
    return (
        <div className='profile'>
            <div className="userInfo">
                <div className="coverture">{user.typeOfUser === 'club' &&
                    <h2 className=' font-bold text-white text-center mt-3 text-xl'>نادي رياضي</h2>}
                </div>
                <input type="file" name="photoProfile" id="photoProfile" className='inputPhoto hidden' onChange={handlePhoto} />
                <div className="photoProfile relative z-40 mx-auto">
                    <img src={user.photoProfile ? `${hostUrl}uploads/${user.photoProfile}` : userPhoto} alt="User PhotoProfile" />
                    {user._id === admin._id ? <div className='label'><label htmlFor="photoProfile"><img src={newPhoto} alt="User PhotoProfile" /></label></div>
                    :admin.following && admin.following.includes(id) ? <div className='label'onClick={unFollow}><img src={dejafollow} alt="deja follow" /></div>: <div className='label cursor-pointer' onClick={handleFollow}><img src={follow} alt="User PhotoProfile" /></div>}
                </div>
                <div className="inforamtions">
                    <small className="photoObligat block w-full text-center font-semibold" ></small>
                    {admin._id === user._id &&<form  onSubmit={changePhotoProfile}> <button className='changePhoto'>تغيير الصورة</button></form>}
                    {message && <div className='jsonMessage'>{message}</div>}
                    <h3 className="username text-center text-2xl font-semibold">{user.name}</h3>
                    <h5 className="text-center text-lg">{user.sport}</h5>
                    <div className="infoCards flex justify-center gap-4 mt-4 flex-wrap">
                        <div className="card">
                            <div className="cardTitle font-semibold">يتابع</div>
                            <div className="cardContent">{user.following ? user.following.length : 0}</div>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">يتابعه</div>
                            <div className="cardContent">{user.followers ? user.followers.length : 0}</div>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">البريد الإلكتروني</div>
                            <Link to={`mailto:${user.email}`} className="cardContent">{user.email}</Link>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">رقم الهاتف</div>
                            <Link to={`tel:${user.phone}`} className="cardContent">{user.phone}</Link>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">الولاية</div>
                            <div className="cardContent">{user.wilaya}</div>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">الدائرة</div>
                            <div className="cardContent">{user.daira}</div>
                        </div>
                        <div className="card">
                            <div className="cardTitle font-semibold">البلدية</div>
                            <div className="cardContent">{user.baladia}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='posts'>
                <Publish />
                {posts && posts.map( post => <Post key={post._id} post={post} />)}
            </div>
        </div>
    )
}

export default UserInfo