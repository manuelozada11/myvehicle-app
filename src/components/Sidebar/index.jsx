import './index.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import logo from '/logo-black.png';
import AppContext from '../../contexts/app';
import { scrollToTop } from '../../common/utils';

const Sidebar = () => {
    const appContext = useContext(AppContext);

    return (
        <div className={`shadow d-flex flex-column justify-content-center sidebar sidebar-${appContext.isOpenSidebar ? 'open' : 'close'}`}>
            <div className='p-4 mb-auto d-flex justify-content-between'>
                <Link to='/' onClick={() => { appContext.setIsOpenSidebar(false); scrollToTop(0); }}><img src={logo} alt="agavemedia-icon" width={150}/></Link>
                <AiOutlineClose size={25} onClick={() => appContext.setIsOpenSidebar(false)}/> 
            </div>

            <ul>
                <Link onClick={() => { appContext.setIsOpenSidebar(false); scrollToTop(0); }} to='' className='py-3 d-flex flex-inline'>
                    <AiFillHome color='black' size={25} />
                    <h5 className='mx-3'>Inicio</h5>
                </Link>

                <Link onClick={() => { appContext.setIsOpenSidebar(false); scrollToTop(0); }} to='signin' className='py-3 d-flex flex-inline'>
                    <FaUser color='black' size={25} />
                    <h5 className='mx-3'>Iniciar sesión</h5>
                </Link>
            </ul>

            <div className='p-4 mt-auto text-center' style={{ fontSize: 15 }}>
                Copyright 2022 ©
            </div>
        </div>
    );
}
 
export default Sidebar;