import React, { useContext } from 'react'
import { AdminContext } from '../../context/UserContext';

const Accounts = () => {
  const admin = useContext(AdminContext);
  return (
    <div className='accounts'>
      <div className="infoCards flex justify-center gap-4 mt-4 flex-wrap">
        <div className="card">
            <div className="cardTitle font-semibold">يتابع</div>
            <div className="cardContent">{admin.following ? admin.following.length : 0}</div>
        </div>
        <div className="card">
            <div className="cardTitle font-semibold">يتابعه</div>
            <div className="cardContent">{admin.followers ? admin.followers.length : 0}</div>
        </div>
      </div>
    </div>
  )
}

export default Accounts