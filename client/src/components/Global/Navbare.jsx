import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

import './style.css'

import logoMain from '../../assets/Logo/LogoMain.png'
import logoWhite from '../../assets/Logo/LogoWhite.png'
import logoMainResp from '../../assets/Logo/LogoMainResp.png'
import logoWhiteResp from '../../assets/Logo/LogoWhiteResp.png'

const Navbare = () => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [menu, setMenu] = useState(false);
    const location = useLocation();
    const isHome = location.pathname.endsWith('/dzsports');

    useEffect(() => {
        const handleScroll = () => {
            let position = window.pageYOffset;
            setScrollPosition(position);
        };
        window.addEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    const navbarStyle = {
        backgroundColor: scrollPosition < 200 && isHome  ? 'transparent' : '#fff',
        boxShadow: scrollPosition < 200 && isHome ?  '0px 0px transparent' : '0 1px 9px 0 #aaa',
        height: '55px',
        display: 'flex',
        alignItems: 'center',
        top: 0,
        transition: 'var(--transition)'
    };
    const linkStyle = {
        color: scrollPosition < 200 && isHome ? '#fff' : '#000',
    };
    const buttonStyle = {
        backgroundColor: scrollPosition < 200 && isHome ? 'transparent' : 'var(--main-color)',
        borderRadius:'7px'
    };
    const openIconStyle = {
        color : scrollPosition < 200 && isHome ? '#fff' : '#666',
        cursor: 'pointer'
    }
return (
    <>
    <nav className='homeNav fixed left-0 right-0 z-50 overflow-hidden' style={navbarStyle}>
        <div className="container nav w-full flex items-center">
            <div className="logo flex items-center">
                <Link to='/dzsports/interface'><img src={scrollPosition < 200 && isHome ? logoWhite : logoMain} className='logoImg hidden md:block' alt="DZSPORTS LOGO" onClick={scrollToTop} /></Link>
                <Link to='/dzsports/interface'><img src={scrollPosition < 200 && isHome ? logoWhiteResp : logoMainResp} className='logoImg block md:hidden' alt="DZSPORTS LOGO" onClick={scrollToTop} /></Link>
            </div>
            <menu className={ menu ? 'flex open': 'flex'}>
                <Link to="/dzsports" style={linkStyle} className=' p-4 text-lg relative' onClick={()=>{setMenu(!menu); scrollToTop()}}>الرئيسية</Link>
                <Link to="/dzsports/#popularSports" style={linkStyle} className=' p-4 text-lg relative' onClick={()=>{setMenu(!menu)}}>الرياضات</Link>
                <Link to="/dzsports/#using" style={linkStyle} className=' p-4 text-lg relative' onClick={()=>{setMenu(!menu)}}>الاستخدام</Link>
                <Link to="/dzsports/#advices" style={linkStyle} className=' p-4 text-lg relative' onClick={()=>{setMenu(!menu)}}>نصائحنا</Link>
            </menu>
            <div className="auth flex gap-2 items-center">
                <button style={buttonStyle} className='text-white border p-2'><Link to={'/dzsports/login'}>الدخول</Link></button>
                <button style={buttonStyle} className='text-white border p-2'><Link to={'/dzsports/signup'}>حساب جديد</Link></button>
                <i className={menu ?"uil uil-times-square block md:hidden text-2xl p-4":"uil uil-apps block md:hidden text-2xl p-4"} style={openIconStyle} onClick={()=>{setMenu(!menu)}}></i>
            </div>
        </div>
    </nav>
    </>
)
}

export default Navbare