import { useEffect } from 'react';
import AppProvider from './contexts/app/Provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserHome from './views/UserHome';
import VehicleDetails from './views/VehicleDetails';
// views
import Home from './views/Home';
import Login from './views/Login';

import './styles/App.css';
import { setStorageValue } from './common/utils';

const App = () => {
  useEffect(() => {
    setStorageValue('apiDomain', window.location.hostname === 'mivehiculo.vercel.app' 
      ? "https://backend.myvehicle.vercel.app/v1"
      : "http://localhost:5000/v1");
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<Login />} />
          <Route path='signup' element={<Login />} />
          <Route path='forgetPwd' element={<Login />} />
          <Route path='resetPwd' element={<Login />} />
          <Route path='user' element={<UserHome />} />
          <Route path='vehicle/:_id' element={<VehicleDetails />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
