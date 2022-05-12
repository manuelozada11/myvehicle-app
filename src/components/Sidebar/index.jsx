import './index.css'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineClose, AiFillCamera, AiFillVideoCamera, AiFillMessage } from 'react-icons/ai'
import { FaLaptopCode } from 'react-icons/fa'
import { BsPersonBoundingBox } from 'react-icons/bs'
import logo from '../../public/logo-black.png'
import AppContext from '../../contexts/app'
import { scrollToTop } from '../../common/utils'

const options = [
    {
        icon: <AiFillCamera color='black' size={25} />,
        name: 'Fotos',
        to: 'fotos'
    },
    {
        icon: <AiFillVideoCamera color='black' size={25}/>,
        name: 'Videos',
        to: 'videos'
    },
    {
        icon: <FaLaptopCode color='black' size={25} />,
        name: 'Webdev',
        to: 'webs'
    },
    {
        icon: <BsPersonBoundingBox color='black' size={25} />,
        name: 'Nosotros',
        to: 'nosotros'
    },
    {
        icon: <AiFillMessage color='black' size={25} />,
        name: 'Contacto',
        to: 'contacto'
    },
]

const Sidebar = () => {
    const appContext = useContext(AppContext)
    return (
        <div className={`shadow d-flex flex-column justify-content-center sidebar sidebar-${appContext.isOpenSidebar ? 'open' : 'close'}`}>
            <div className='p-4 mb-auto d-flex justify-content-between'>
                <Link to='/' onClick={() => {appContext.setIsOpenSidebar(false); scrollToTop(0);}}><img src={logo} alt="agavemedia-icon" width={150}/></Link>
                <AiOutlineClose size={25} onClick={() => appContext.setIsOpenSidebar(false)}/> 
            </div>

            <ul>
            { options.map((nav, index) => {
                return (
                    <Link key={`${index}${nav.name}`} onClick={() => {appContext.setIsOpenSidebar(false); scrollToTop(0); }} to={nav.to} className='py-3 d-flex flex-inline'>
                        {nav.icon}
                        <h5 className='mx-3'>{nav.name}</h5>
                    </Link>
                )
            }) }
            </ul>

            <div className='p-4 mt-auto text-center' style={{ fontSize: 15 }}>
                Copyright 2022 ©
            </div>
        </div>
    );
}
 
export default Sidebar;