import './index.css'
import { Link } from 'react-router-dom'
import {FaInstagram} from 'react-icons/fa'
import logo from '/logo512.png'
import packageJson from '../../../package.json'
import {scrollToTop} from '../../common/utils'

const Footer = () => {
    return (
        <footer className='p-3 mt-md-5'>
            <div className='container'>
                <div className='row m-2 pt-md-4 d-flex justify-content-center'>
                    <div className='col-6 col-md-3 p-2'>
                        <Link to='/' onClick={() => scrollToTop(0)}>
                            <img src={logo} alt="agave-black" width={80} />
                            <p style={{ color: 'rgb(169 169 169)' }} >Copyright 2022 © v{packageJson.version} </p>
                        </Link>
                    </div>

                    <div className='col-6 col-md-9 p-2'>
                        <h5 className='pb-2 color-primary'>Información</h5>
                        <ul>
                            <Link to='webs' onClick={() => scrollToTop(0)}>Sobre MyVehicle</Link>
                            <Link to='videos' onClick={() => scrollToTop(0)}>Contacto</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;