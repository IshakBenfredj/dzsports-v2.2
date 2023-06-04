import React from 'react'
import './style.css'

const Title = (props) => {

return (
    <div className='flex justify-center'>
        <h2 className='w-fit p-2 relative text-xl title'>{props.title}</h2>
    </div>
)
}

export default Title