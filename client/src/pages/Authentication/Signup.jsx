import React, { useState } from 'react'

import Navbar from '../../components/Global/Navbare'
import Footer from '../../components/Global/Footer'

import FormUser from './components/FormUser'
import FormClub from './components/FormClub'

import './style.css'

const Signup = () => {
  const [activeForm, setActiveForm] = useState('client');

  const handleFormClick = (formId) => {
    setActiveForm(formId);
  }
  return (
      <>
        <Navbar />
        <div className='formsPage'>
          <div className="formIntro">
            <h1 className='relative text-white my-3 mx-auto w-full text-4xl'>إنشاء حساب</h1>
          </div>
          <div className="formsInfo">
            <div className="typesOfUsers w-full flex justify-between">
              <span className={activeForm === 'client' ? 'active cursor-pointer' : 'cursor-pointer'} onClick={() => handleFormClick('client')}>زبون</span>
              <span className={activeForm === 'club' ? 'active cursor-pointer' : 'cursor-pointer'} onClick={() => handleFormClick('club')}>نادي رياضي</span>
            </div>
            <div className="forms">
              <FormUser activeForm={activeForm} />
              <FormClub activeForm={activeForm} />
            </div>
          </div>
        </div>
        <Footer />
      </>
  )
}

export default Signup