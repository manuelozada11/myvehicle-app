import { useState } from "react";
import Carousel from "../components/Carousel";
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';

import '../styles/App.css';
const mainStyle = {
    "titleFontSize": "4.5rem",
    "subtitleFontSize": "3.5rem",
    "thirdTitleFontSize": "2.5rem",
    "fontFamily": "Bebas Neue",
    "textDecoration": "none",
    "colorPrimary": "#a9a9a9",
    "colorSecundary": "#e9c200",
    "colorThird": "#212121",
    "colorPositive": "#fff",
    "titleLineHeight": "4.5rem",
    "subtitleLineHeight": "3.5rem"
}

const Contact = () => {
    const [carouselContact,] = useState([
        {
            title: 'Contáctanos',
            subtitle: 'siempre a tu alcance',
            url: '/img/contacto.jpg'
        }
    ])

    return (
        <div className="container-fluid h-100 px-0">
            <Carousel infoCarouselImgs={ carouselContact } />
            
            <div className="container-fluid text-center px-5 pt-5">
                <h1 style={{ fontSize: mainStyle.titleFontSize, fontFamily: mainStyle.fontFamily, lineHeight: mainStyle.titleLineHeight }}>
                    ¿Alguna duda?
                </h1>
            </div>

            <div className="container px-5 pb-5 pt-3 pt-md-5">
                <div className="row mx-0">
                    <div className="col-12 col-md-6">
                        <span className="fw-bold">Hola!</span> Para nosotros es muy importante que tengas toda la información necesaria antes de contratar nuestros servicios.
                        Y por eso, dejamos a tu disposición cualquiera de las siguientes vías de contacto. Aunque tenemos disponibilidad en distintos paises puedes escribirnos a cualquiera de nuestros números
                        y con gusto redirigimos tu mensaje.
                    </div>

                    <div className="col-12 col-md-6 ps-md-5 pt-4 pt-md-0 text-left">
                        <div className="col-12 py-1"><FaInstagram size={30} className="me-2" /><a className="link" href="https://instagram.com/agavemedia">agavemedia</a></div>
                        <div className="col-12 py-1"><FaWhatsapp size={30} className="me-2" /><a className="link" href="https://wa.me/50762803490">PA (+507) 6280-3490</a></div>
                        <div className="col-12 py-1"><FaWhatsapp size={30} className="me-2" /><a className="link" href="https://wa.me/584145412173">VE (+58) 414-541 21 73</a></div>
                        <div className="col-12 py-1"><FiMail size={30} className="me-2" /><a className="link" href="mailto:agavemediave@gmail.com">agavemediave@gmail.com</a></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Contact;