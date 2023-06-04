import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserNavbar from '../components/Global/UserNavbar';
import Interface from './Interface/Interface';
import Profile from './Interface/Profile';
import Settings from './Settings/Settings';

function UserHome() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
        {isLoggedIn && <UserNavbar />}
        <Routes>
            <Route path='/dzsports/interface' element={isLoggedIn ? <Interface /> : <Navigate to='/dzsports/login' /> } />
            <Route path='/dzsports/profile/:id' element={<Profile /> } />
            <Route path='/dzsports/settings' element={ isLoggedIn ? <Settings /> : <Navigate to='/dzsports/login' />} />
        </Routes>
    </>
  );
}

export default UserHome;
