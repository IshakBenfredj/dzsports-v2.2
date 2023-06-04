import React from 'react'
import LandingVideo from '../../assets/Videos/Landingvideo.mp4'
import LandingImg from '../../assets/landingImg.png'

const Landing = () => {
    return (
        <>
            <div className='relative landing overflow-hidden'>
                <div className="overlay absolute w-full h-full"></div>
                <div className="caro md:block hidden absolute bg-teal-600"></div>
                <video src={LandingVideo} className='h-full object-cover w-full' autoPlay loop />
                <div className="landingContainer container text-white absolute w-full flex justify-center items-center">
                    <h1 className='landingText'>مرحبا بك في 
                        <span className='font-semibold'> DZSPORTS </span>
                        وجهتك لإختيار الرياضة التي تريدها والصالة الرياضية التي تريدها 
                    </h1>
                    <div className="img md:block hidden">
                        <img src={LandingImg} alt='sportf man' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Landing