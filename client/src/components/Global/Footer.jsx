import React from 'react'
import { HashLink as Link } from 'react-router-hash-link'
import logoWhite from '../../assets/Logo/LogoWhite.png'

const Footer = () => {

    const year = ()=>{
        const date = new Date();
        return date.getFullYear();
    }

    return (
        <footer>
            <div className="container flex justify-center md:justify-between items-center flex-wrap p-2">
                <div className="logo flex items-center">
                    <Link to='/dzsports'><img src={logoWhite} className='logoImg' alt="DZSPORTS LOGO" /></Link>
                </div>
                <menu className='flex flex-wrap'>
                    <Link to="/dzsports" className={' p-4 text-sm md:text-lg relative text-white'}>الرئيسية</Link>
                    <Link to="/dzsports/#popularSports" className=' p-4 text-sm md:text-lg relative text-white'>الرياضات</Link>
                    <Link to="/dzsports/#using" className=' p-4 text-sm md:text-lg relative text-white'>الاستخدام</Link>
                    <Link to="/dzsports/#advices" className=' p-4 text-sm md:text-lg relative text-white'>نصائحنا</Link>
                </menu>
            </div>
            <div className="container p-2 text-gray-300 text-lg md:text-xl text-center">
                مرحبا بك في DZSPORTS , وجهتك لإختيار الرياضة المناسبة والصالة الرياضية المناسبة والموافقة لرغباتك
            </div>
            <div className="container flex justify-between items-center flex-wrap p-2">
                <div className="copyRightText text-white text-xl">جميع الحقوق محفوظة</div>
                <div className="copyRightYear text-2xl text-white flex items-center gap-1"><span>{year()}</span> <span className='copy'>&copy;</span> </div>
            </div>
        </footer>
    )
}

export default Footer