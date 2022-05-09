import './App.css'
import AppProvider from './contexts/app/Provider'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// components
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Footer from './components/Footer'
// views
import Home from './views/Home'
import Videos from './views/Videos'
import Photography from './views/Photography'
import WebDev from './views/WebDev'
import AboutUs from './views/AboutUs'
import Contact from './views/Contact'
import Reviews from './views/Reviews'

const App = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='videos' element={<Videos />} />
          <Route path='fotos' element={<Photography />} />
          <Route path='webs' element={<WebDev />} />
          <Route path='nosotros' element={<AboutUs />} />
          <Route path='contacto' element={<Contact />} />
          <Route path='clientes' element={<Reviews />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
