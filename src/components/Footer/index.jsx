import './index.css'
import { Link } from 'react-router-dom'
import logo from '../../public/logo512.png'
import packageJson from '../../../package.json'

const Footer = () => {
    return (
        <footer className='p-3 mt-md-5'>
            <div className='container'>
                <div className='row m-2 pt-md-4 d-flex justify-content-center'>
                    <div className='col-6 col-md-3 p-2'>
                        <Link to='/'>
                            <img src={logo} alt="agave-black" width={80} />
                            <p style={{ color: 'rgb(169 169 169)' }} >Copyright 2022 © v{packageJson.version} </p>
                        </Link>
                    </div>
                    <div className='col-6 col-md-3 p-2'>
                        <h5 className='pb-2'>Servicios</h5>
                        <ul>
                            <Link to='webs'>Desarrollo Web</Link>
                            <Link to='videos'>Videos</Link>
                            <Link to='fotos'>Fotografias</Link>
                        </ul>
                    </div>
                    <div className='col-6 col-md-3 p-2'>
                        <h5 className='pb-2'>Nosotros</h5>
                        <ul>
                            <Link to='nosotros'>Sobre nosotros</Link>
                            <Link to='nosotros'>Nuestra inspiracion</Link>
                        </ul>
                    </div>
                    <div className='col-6 col-md-3 p-2'>
                        <h5 className='pb-2'>Contacto</h5>
                        <ul>
                            <Link to='contacto'>Direccion</Link>
                            <Link to='contacto'>Email</Link>
                            <Link to='contacto'>RRSS</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
 
export default Footer;