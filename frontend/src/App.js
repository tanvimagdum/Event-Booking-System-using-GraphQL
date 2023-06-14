import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import React, { useState } from "react";
import './App.css';
import AuthPage from './pages/Auth';
import EventsPage from './pages/Events';
import BookingsPage from './pages/Bookings';
import MainNavigation from './components/navigation/MainNavigation';
import AuthContext from "./context/auth-context";

function App() {

  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (token, userId, tokenExpiration) => {
    setToken(token);
    setUserId(userId);
  }

  const logout = () => {
    setToken(null);
    setUserId(null);
  }


  return (
    <div className='container'>
      <BrowserRouter>
      <AuthContext.Provider value={{token: token, userId: userId, login, logout}}>
        <MainNavigation/>
          <Routes>
            {!token && <Route path="/" element={<Navigate to="/auth"/>}/>}
            {token && <Route path="/" element={<Navigate to="/events"/>}/>}

            {token && <Route path="/auth" element={<Navigate to="/events"/>}/>}
            {!token && <Route path="/auth" element={<AuthPage/>}/>}

            <Route path="events" element={<EventsPage/>}/>

            {token && <Route path="/bookings" element={<BookingsPage/>}/>}
            {!token && <Route path="/bookings" element={<Navigate to="/auth"/>}/>}
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>


    </div>
  );
}

export default App;
