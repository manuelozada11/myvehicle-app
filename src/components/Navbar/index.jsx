import './index.css'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import logo from '/logo-white.png'
import { useAuth } from '../../hooks/useAuth';
import { getStorageValue, removeItemStorage, scrollToTop } from '../../common/utils';

const Navbar = () => {
    const { setIsOpenSidebar } = useAuth();

    const onSignOut = () => {
        scrollToTop(0);
        removeItemStorage('user');
        removeItemStorage('token');
    }

    return (
        <nav className="navbar">
            <div className='navbar-mobile'>
                <div className='icon-menu' onClick={() => setIsOpenSidebar(true)}>
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
                <h1 className='fw-bold m-0 color-primary'>vehi</h1>
            {/* </Link> */}
            </div>
            <ul className='d-flex flex-row justify-content-end pe-3'>
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