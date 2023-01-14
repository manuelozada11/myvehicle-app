import { useEffect } from 'react';
import AppProvider from './contexts/auth/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserHome from './views/UserHome';
import VehicleDetails from './views/VehicleDetails';
import AddVehicle from './views/AddVehicle';
import Refuels from './views/Refuels';
import AddRefuel from './views/AddRefuel';
import VehicleInfo from './views/VehicleInfo';
import MaintenanceHome from './views/MaintenanceHome';
// views
import Home from './views/Home';
import Login from './views/Login';

import './styles/App.css';
import { setStorageValue } from './common/utils';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  useEffect(() => {
    setStorageValue('apiDomain', window.location.hostname !== "localhost" 
      ? "https://api-myvehicle.vercel.app/v1"
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

          <Route path='user' element={
            <PrivateRoute>
              <UserHome />
            </PrivateRoute>
          } />

          <Route path='refuels' >
            <Route path='add' element={
              <PrivateRoute>
                <AddRefuel />
              </PrivateRoute>
            } />

            <Route path='v/:_id' element={
              <PrivateRoute>
                <Refuels />
              </PrivateRoute>
            } />
          </Route>

          <Route path='vehicle' >
            <Route path='add' element={
              <PrivateRoute>
                <AddVehicle />
              </PrivateRoute>
            } />

            <Route path='info/:_id' element={
              <PrivateRoute>
                <VehicleInfo />
              </PrivateRoute>
            } />

            <Route path='maintenance/:_id' element={
              <PrivateRoute>
                <MaintenanceHome />
              </PrivateRoute>
            } />

            <Route path=':_id' element={
              <PrivateRoute>
                <VehicleDetails />
              </PrivateRoute>
            } />
          </Route>

          <Route path='maintenance'>
            <Route path='v/:_id' element={
              <PrivateRoute>
                <MaintenanceHome />
              </PrivateRoute>
            }/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
