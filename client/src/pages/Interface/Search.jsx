import React, { useContext, useEffect, useState } from 'react'
// import { HashLink as Link } from 'react-router-hash-link';
import axios from 'axios'
import getPlace from '../../components/functions/GetPlace'
import userPhoto from '../../assets/user.png'
import follow from '../../assets/follow.png'
import dejafollow from '../../assets/dejafollow.png'
import { AdminContext } from '../../context/UserContext'
import { hostUrl } from '../../helper'
// import { Navigate } from 'react-router-dom';


const Search = () => {

  const admin = useContext(AdminContext);
  const [message, setMessage] = useState('');
    // const [user, setUser] = useState({});


  const [place , setPlace] = useState({
    wilaya: '',
    daira: '',
    baladia: ''
  })

  const [searchResults, setSearchResults] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handlChange = (e) => {
    setPlace({...place , [e.target.name] : e.target.value})
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    document.querySelector('.dontResult').innerHTML = 'جاري البحث ...'
    if (place.wilaya && place.daira && place.baladia) {
      try {
        const response = await axios.post(`${hostUrl}search`, place);
        if (response.data.users.length !== 0){
          setSearchResults(response.data.users);
        } else {
          document.querySelector('.dontResult').innerHTML = 'ليس هناك نتائج توافق بحثك'
        }
        // console.log(response.data.users);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
      document.querySelector('.dontResult').innerHTML = 'املئ جميع الخانات للبحث'
    }
  };

  useEffect(() => {
    getPlace('wilayaSelect1','dairaSelect1','baladiaSelect1');
  })
  return (
    <>
      <div className="search flex flex-col" onSubmit={handleSearch}>
        <label htmlFor="address" className='titlesearch cursor-pointer' onClick={()=>setShowForm(!showForm)}><span>البحث عن نادي</span><i className={`uil uil-angle-${showForm ? 'up' : 'down'} text-white`}></i></label>
        <form className={`places flex-col gap-2 ${showForm ? 'show' : null}`}>
          <div className="wilaya">
            <label htmlFor="wilaya" className=' ml-1' >الولاية</label>
            <select name="wilaya" id="wilaya" onChange={handlChange} defaultValue={document.querySelectorAll('#wilaya option')[0]} className='wilayaSelect1'>
              <option>إختر ولاية</option>
            </select>
          </div>
          <div className="daira">
            <label htmlFor="daira" className=' ml-1' >الدائرة</label>
            <select name="daira" id="daira" onChange={handlChange} defaultValue={document.querySelectorAll('#daira option')[0]} className='dairaSelect1'>
              <option>إختر دائرة</option>
            </select>
          </div>
          <div className="baladia">
            <label htmlFor="baladia" className=' ml-1' >البلدية</label>
            <select name="baladia" id="baladia" onChange={handlChange} defaultValue={document.querySelectorAll('#baladia option')[0]} className='baladiaSelect1'>
              <option>إختر بلدية</option>
            </select>
          </div>
          <button className="search">بحث</button>
        </form>
        <div className={`searchResult ${showForm ? 'show' : null}`}>
        <div className='text-center mb-4 mt-4 text-2xl'>نتائج البحث</div>
        {message && <div className='jsonMessage'>{message}</div>}
          {searchResults.length > 0 ? (
              searchResults.map((userFound) => (
                userFound.typeOfUser === 'club' &&
                <div
                key={userFound._id}
                className="accountResult flex gap-2 align-middle justify-between mt-3 md:w-2/3 w-full"
              >
                {admin._id !== userFound._id ?
                admin.following && admin.following.includes(userFound._id) ? <img src={dejafollow} alt="userFound PhotoProfile" />: <img src={follow} alt="User PhotoProfile" /> : null}
              <a href={`/dzsports/profile/${userFound._id}`} className='flex gap-2 align-middle justify-between cursor-pointer'>
                <span className="text-xl text-white">{userFound.name}</span>
                <img src={userFound.photoProfile ?`${hostUrl}uploads/${userFound.photoProfile}`:userPhoto} alt="userPhoto" className="w-8 h-8" />
              </a>
            </div>
            ))
          ) : (
            <div className='dontResult text-center text-red-600 font-semibold'></div>
          )}
      </div>
      </div>
    </>
  )
}

export default Search