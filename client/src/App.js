import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/Login';
import Signup from './pages/Authentication/Signup';

import './App.css';
import UserHome from './pages/UserHome';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path='/dzsports/' element={isLoggedIn ? <Navigate to='/dzsports/interface' /> : <Home />} />
        <Route path='/dzsports/login' element={isLoggedIn ? <Navigate to='/dzsports/interface' /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/dzsports/signup' element={isLoggedIn ? <Navigate to='/dzsports/interface' /> : <Signup />} />
      </Routes>
      <UserHome />
    </>
  );
}

export default App;
