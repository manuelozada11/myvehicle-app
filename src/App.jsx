import './App.css';
import AppProvider from './contexts/app/Provider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
// views
import Home from './views/Home';
// import Videos from './views/Videos'
// import Photography from './views/Photography'
// import WebDev from './views/WebDev'
// import AboutUs from './views/AboutUs'
import Contact from './views/Contact';
// import Reviews from './views/Reviews'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='videos' element={<Home />} />
          <Route path='fotos' element={<Home />} />
          <Route path='webs' element={<Home />} />
          <Route path='nosotros' element={<Home />} />
          <Route path='contacto' element={<Contact />} />
          <Route path='clientes' element={<Home />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
