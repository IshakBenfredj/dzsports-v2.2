import React from 'react'

import Navbar from '../../components/Global/Navbare'
import Footer from '../../components/Global/Footer'

import FormLogin from './components/FormLogin'

const Login = () => {
  return (
  <>
    <Navbar />
    <FormLogin />
    <Footer />
  </>
  )
}

export default Login