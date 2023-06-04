import React from 'react'
import './style.css'
import Landing from './Landing'
import PopularSports from './PopularSports'
import Using from './Using'
import Advices from './Advices'
import Navbar from '../../components/Global/Navbare'
import Footer from '../../components/Global/Footer'

const Home = () => {
    return (
        <>
            <Navbar />
            <Landing />
            <PopularSports />
            <Using />
            <Advices />
            <Footer />
        </>
    )
}

export default Home