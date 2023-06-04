import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import login from '../../../assets/login.jpg'
import './login.css'
import { hostUrl } from '../../../helper'

const FormLogin = ({ setIsLoggedIn }) => {
    
    const [userInfo,setUser] = useState({
        phone : '',
        password : ''
    })
    // const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setUser({...userInfo,[e.target.name]:e.target.value})
    }
    const Login = async (e) => {
        e.preventDefault();
        console.log(userInfo);
        try {
            const response = await axios.post(`${hostUrl}login`, userInfo);
            const { token, userId } = response.data;
            // Store token,user in local storage
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            // Set isLoggedIn state to true
            setIsLoggedIn = true;
            // Redirect to the interface page
            // navigate('/dzsports/interface');
            window.location.href = "/dzsports/interface"
        } catch (error) {
            console.error(error);
            setError('رقم الهاتف أو كلمة المرور غير صحيحة');
        }
    }
return (
    <>
    <div className='log' >
        <div className="con">
            <div className="design">
                <img src={login} alt="none"/>
            </div>
            <form className="login" onSubmit={Login}>
                <h3 className="titlee">تسجيل الدخول</h3>
                {error && <div className='error'>{error}</div>}
                <div className="text-input">
                    <input type="tel" name='phone' value={userInfo.phone} placeholder="رقم الهاتف" onChange={handleChange} autoComplete='false' required/>
                </div>
                <div className="text-input">
                    <input type="password" name='password' value={userInfo.password} placeholder="كلمة السر" autoComplete='false' onChange={handleChange} required/>
                </div>
                <input type="submit" value="تسجيل" className='login-btn cursor-pointer'/>
                <div className="create">
                    <Link to="/dzsports/signup" className='lin'>انشاء حساب </Link>
                </div>
            </form>
        </div>
    </div>
    </>
)
}

export default FormLogin