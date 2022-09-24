import './index.css'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import { useContext } from 'react'
import logo from '/logo-white.png'
import AppContext from '../../contexts/app'
import { getStorageValue, removeItemStorage, scrollToTop } from '../../common/utils'
import { useEffect } from 'react'

const Navbar = () => {
    const appContext = useContext(AppContext);

    const onSignOut = () => {
        scrollToTop(0);
        removeItemStorage('user');
        removeItemStorage('token');
    }

    return (
        <nav className="navbar">
            <div className='navbar-mobile'>
                <div className='icon-menu' onClick={() => appContext.setIsOpenSidebar(true)}>
                    <AiOutlineMenu size={25} />
                </div>

                <ul className='d-flex flex-column'>
                    { getStorageValue('token')
                        ? <Link onClick={ onSignOut } to=''>
                            Cerrar sesión
                        </Link>
                        : <Link to='signin'>
                            Iniciar sesión
                        </Link>
                    }
                </ul>
            </div>

            <div className='p-3'>
            {/* <Link to="/" className='p-3' onClick={ onSignOut }> */}
                {/* <img src={logo} alt="agavemedia" width={200} /> */}
                <h1 className='fw-bold m-0 color-primary'>MVApp</h1>
            {/* </Link> */}
            </div>
            <ul className='d-flex flex-row justify-content-end'>
                { getStorageValue('token')
                    ? <Link onClick={ onSignOut } to=''>
                        Cerrar sesión
                    </Link>
                    : <Link to='signin'>
                        Iniciar sesión
                    </Link>
                }
            </ul>
        </nav>
    );
}
 
export default Navbar;