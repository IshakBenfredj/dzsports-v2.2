import React, { useContext, useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import './UserNavbar.css' 

import logoMain from '../../assets/Logo/LogoMain.png'
import Notification from '../Parts/Notification';
import { AdminContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import {hostUrl} from '../../helper'

const UserNavbar = () => {

    const [select, setSelect] = useState(false);
    const [numberOfNotifications, setNumberOfNotifications] = useState();
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    const admin = useContext(AdminContext);

    const logOut = () => {
    // Remove token and user from local storage
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    // Redirect to login page
    window.location.href = "/dzsports/login";
    };

    const initializeNotifyNumbers = async ()=>{
        const response = await axios.post(`${hostUrl}initializeNotifyNumbers/${admin._id}`);
        setNumberOfNotifications(response.data.user.nombreOfNotifications)
    }

    useEffect(() => {
        setNumberOfNotifications(admin.nombreOfNotifications);
        setNotifications(admin.notifications)
        const handleClickOutside = (event) => {
            const isClickedInsideSN = event.target.closest('.sn');
            const isClickedInsideSO = event.target.closest('.so');
            
            if (!isClickedInsideSN && !isClickedInsideSO) {
                setSelect(false);
                setShowNotifications(false);
            }
            if (isClickedInsideSN) {
                setSelect(false);
            }
            if (isClickedInsideSO) {
                setShowNotifications(false);
            }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [admin,notifications]);
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
return (
    <>
    <nav className='userNav fixed left-0 right-0 z-50 overflow-hidden'>
        <div className="container nav w-full flex items-center">
            <div className="logo flex items-center">
                <Link to='/dzsports/interface'><img src={logoMain} className='logoImg hidden md:block' alt="DZSPORTS LOGO" onClick={scrollToTop} /></Link>
            </div>
            <div className='flex align-baseline'>
                <Link to="/dzsports/interface" className=' p-4 relative' onClick={scrollToTop} ><i className="uil uil-estate"></i></Link>
                <Link to="/dzsports" className=' p-4 relative'><i className="uil uil-comment-alt-message"></i></Link>
                <div className='sn p-4 relative' onClick={()=> {setShowNotifications(!showNotifications) ; initializeNotifyNumbers()}}>
                    {(numberOfNotifications && numberOfNotifications !== 0) ? <span className={`numOfNotify`}>{numberOfNotifications}</span> : null}
                    <i className="uil uil-bell"></i>
                    { showNotifications &&
                        <div className="allNotify h-3/4">
                            {
                                notifications && notifications.length ?
                                notifications.slice().reverse().map(notify => (notify.message && <Notification key={notifications.indexOf(notify)} notification={notify} />))
                                : <h3 className=' text-2xl p-2 text-gray-900'>ليس لديك أي إشعارات</h3>
                            }
                        </div>
                    }
                </div>
            </div>
            <div>
                <div className="so select relative">
                    <div className="head flex align-middle justify-center" onClick={(e)=> setSelect(!select)} >{admin.photoProfile ? <img className='userNavPhoto' src={`${hostUrl}uploads/${admin.photoProfile}`} alt='' /> : <i className="userIcon uil uil-user-circle"></i>}<span className='username mr-2'>{admin.name}</span></div>
                    <div className={`options ${select ? 'show' : ''}`} onClick={(e)=>setSelect(!select)} >
                        <Link to={`/dzsports/profile/${admin._id}`} className="option"  onClick={()=> Navigate(`/dzsports/profile/${admin._id}`)}><i className="uil uil-user-circle"></i><span className=' mr-2'>الحساب الشخصي</span></Link>
                        <Link to={'/dzsports/settings'} className="option"><i className="uil uil-setting"></i><span className=' mr-2'>الإعدادات</span></Link>
                        <Link className="option"><i className="uil uil-sign-out-alt"></i><span className=' mr-2' onClick={logOut}>تسجيل الخروج</span></Link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    </>
)
}

export default UserNavbar


