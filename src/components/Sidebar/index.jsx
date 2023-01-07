import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { AiOutlineClose, AiFillHome } from 'react-icons/ai';
import { FiLogOut, FiLogIn } from 'react-icons/fi';
import { useAuth } from '../../hooks/useAuth';
import logo from '/logo-black.png';
import { getStorageValue, scrollToTop, translate } from '../../common/utils';
import './index.css';
import { version } from '../../../package.json';

const Sidebar = () => {
    const { isOpenSidebar, setIsOpenSidebar, signOut } = useAuth();

    const onSignOut = () => { 
        setIsOpenSidebar(false);
        signOut();
    }

    const onProfile = () => {
        setIsOpenSidebar(false); 
        scrollToTop(0);
    }

    return (
        <div className={`shadow d-flex flex-column justify-content-center sidebar sidebar-${isOpenSidebar ? 'open' : 'close'}`}>
            <div className='p-4 mb-auto d-flex justify-content-between'>
                <h1 className='fw-bold p-0'>vehi</h1>
                {/* <Link to='/' onClick={() => { setIsOpenSidebar(false); scrollToTop(0); }}><img src={logo} alt="agavemedia-icon" width={150}/></Link> */}
                <AiOutlineClose className='ms-auto' size={25} onClick={() => setIsOpenSidebar(false)}/> 
            </div>

            <ul>
                <Link onClick={() => { setIsOpenSidebar(false); scrollToTop(0); }} to='' className='py-3 d-flex flex-inline'>
                    <AiFillHome color='black' size={25} />
                    <h5 className='mx-3'>{translate("sidebar.option1.home")}</h5>
                </Link>

                { getStorageValue('token')
                    ? <>
                        <Link onClick={ onProfile } to='' className='py-3 d-flex flex-inline'>
                            <FaUser color='black' size={25} />
                            <h5 className='mx-3'>{translate("sidebar.option2.profile")}</h5>
                        </Link>

                        <Link onClick={ onSignOut } to='' className='py-3 d-flex flex-inline'>
                            <FiLogOut color='black' size={25} />
                            <h5 className='mx-3'>{translate("sidebar.option4.signout")}</h5>
                        </Link>
                    </>
                    : <Link onClick={() => { setIsOpenSidebar(false); scrollToTop(0); }} to='signin' className='py-3 d-flex flex-inline'>
                        <FiLogIn color='black' size={25} />
                        <h5 className='mx-3'>{translate("sidebar.option3.signin")}</h5>
                    </Link>
                }
            </ul>

            <div className='p-4 mt-auto text-center d-flex flex-column' style={{ fontSize: 15 }}>
                <div>ver { version }</div>
                <div>Copyright 2022 ©</div>
            </div>
        </div>
    );
}
 
export default Sidebar;