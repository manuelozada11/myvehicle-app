import AppProvider from './contexts/app/Provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
// views
import Home from './views/Home';
import Login from './views/Login';

import './styles/App.css';

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='signin' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
