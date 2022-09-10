import { useState } from 'react';
import Carousel from '../../components/Carousel';

import "./index.css";
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
};

const AboutUs = () => {
    const [carouselAboutUs,] = useState([
        {
            title: 'Sobre nosotros',
            subtitle: 'Amantes del documentalismo, en todas sus facetas',
            url: '/img/nosotros.jpg',
            mid: true
        }
    ]);
    const [carouselAboutUsMid,] = useState([
        {
            title: '',
            subtitle: 'Fotografiar es inmortalizar tus recuerdos...',
            url: '/img/nosotros-mid.jpg',
            mid: true
        }
    ]);

    return (
        <div className="container-fluid h-100 px-0">
            <Carousel infoCarouselImgs={ carouselAboutUs } />

            <div className="container-fluid font-bebas p-5 text-center" 
                style={{ fontSize: mainStyle.subtitleFontSize, lineHeight: mainStyle.subtitleLineHeight }}>
                <p className='my-4'>Somos quiénes somos, porque <span style={{ color: mainStyle.colorSecundary }}>amamos</span> lo que hacemos</p>
            </div>

            <div className='row mx-0 text-center div-portrait' style={{ backgroundColor: mainStyle.colorThird, color: mainStyle.colorPositive }}>
                <div className='col-12 col-md-6 px-0'>
                    <a href="https://instagram.com/manuelozada11">
                        <img src="/img/home/home-manu.jpg" alt="manuelozada" className='about-portrait' width="100%"/>
                    </a>
                </div>
                <div className='col-12 col-md-6 py-5'>
                    <h3 className='mb-0' style={{ fontFamily: mainStyle.fontFamily, fontSize: mainStyle.thirdTitleFontSize }}>
                        <a className='link-positive' href="https://instagram.com/manuelozada11">Manuel Lozada</a>
                    </h3>
                    <div>
                        <p style={{ fontSize: "1.2rem" }}><span style={{ color: mainStyle.colorSecundary }}>Web Developer.</span> Videógrafo. Drone Pilot</p>
                        <p className='px-4'>Desde pequeño se enamoró por el mundo de la tecnología. Especialmente del desarrollo de aplicaciones. Además, su gran pasión siempre ha sido llevar el cine a cualquier evento donde participa haciendo magia con sus pequeños cortometrajes.</p>
                    </div>
                </div>
            </div>

            <Carousel infoCarouselImgs={ carouselAboutUsMid } />

            <div className='row mx-0 text-center div-portrait'>
                <div className='col-12 col-md-6 py-5'>
                    <h3 className='mb-0' style={{ fontFamily: mainStyle.fontFamily, fontSize: mainStyle.thirdTitleFontSize }}>
                        <a className='link' href="https://instagram.com/luisalvaradol">Luis Alvarado</a>
                    </h3>
                    <div>
                        <p  style={{ fontSize: "1.2rem" }}><span style={{ color: mainStyle.colorSecundary }}>Videógrafo.</span> Fotógrafo. Drone Pilot</p>
                        <p className='px-4'>
                            Gran personaje. En principio, te aseguramos que no pararás de reir en tu evento. Apasionado por lo que hace.
                            Cuenta con una amplia trayectoria de más de 10 años en el mundo de la fotografía.
                            En los últimos 5 años descubrió nuevos talentos ocultos, ¡ser piloto de drone y videógrafo!
                        </p>
                    </div>
                </div>
                <div className='col-12 col-md-6 px-0'>
                    <a href="https://instagram.com/luisalvaradol">
                        <img src="/img/home/home-luis.jpg" alt="manuelozada" className='about-portrait' width="100%"/>
                    </a>
                </div>
            </div>

            <div className='container-fluid p-5 px-md-5 pb-md-2 pt-md-0 text-center'>
                <h1 style={{ fontFamily: mainStyle.fontFamily, fontSize: mainStyle.subtitleFontSize, lineHeight: mainStyle.subtitleLineHeight }}>
                    Inmortalizando momentos <span style={{ color: mainStyle.colorSecundary }}>únicos</span>
                </h1>
            </div>
        </div>
    );
}
 
export default AboutUs;