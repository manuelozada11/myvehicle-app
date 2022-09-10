import { useState } from "react";
import Carousel from "../../components/Carousel";
import { FaInstagram } from 'react-icons/fa'
import './index.css'

const Home = () => {
    const [carouselHomeMain,] = useState([
        {
            title: 'Grandes momentos',
            subtitle: 'con el mínimo de atención',
            url: '/img/home/home-main.jpg'
        }
    ])
    const [carouselHomeSecond,] = useState([
        {
            title: '',
            subtitle: 'Desde las alturas, todo se ve mejor!',
            url: '/img/home/home-drone2.jpg'
        }
    ])

    return (
        <div className="container-fluid px-0">
            <Carousel infoCarouselImgs={ carouselHomeMain }/>

            <div className="container-fluid p-5 agave-bg-dark text-light text-center">
                <h1 className="font-bebas home-title">
                    Detalles que marcan la <span className="text-warning">diferencia</span>
                </h1>
            </div>

            <div className="container-fluid px-5 home-team">
                <h1 className="mt-5 ms-4 font-bebas home-subtitle">
                    hola, somos el <span className="text-warning">team</span> agavemedia
                </h1>

                <p className="mb-5 ms-4">
                    Un equipo de jóvenes emprendedores y apasionados por lo que hacemos. 
                    Desde hace más de 5 años nos dedicamos a formar un equipo altamente capacitado para ofrecer nuestros servicios con la mejor calidad.
                    Cada uno de los integrantes cuentan con una amplia trayectoria en sus especialidades, desde la fotografía y video hasta el atractivo mundo del desarrollo de aplicaciones.
                </p>
            </div>

            <div className="container-fluid text-center">
                <div className="row">
                    <div className="col-6 col-md-3 p-0">
                        <img src="/img/home/home-webdev.jpg" alt="agavewebdev" width='100%' />
                    </div>
                    <div className="col-6 col-md-3 p-0">
                        <img src="/img/home/home-fotos.jpg" alt="agavefotos" width='100%' />
                    </div>
                    <div className="col-6 col-md-3 p-0">
                        <img src="/img/home/home-video.jpg" alt="agavevideo" width='100%' />
                    </div>
                    <div className="col-6 col-md-3 p-0">
                        <img src="/img/home/home-drone.jpg" alt="agavedrone" width='100%' />
                    </div>
                </div>
            </div>

            <div className="container text-center home-py-xl px-3">
                <div className="row mx-0">
                    <div className="col-12 col-md-6 font-bebas home-title2">
                        <p className="m-0 line-sm">un momento que</p>
                        <p className="m-0 line-sm"><span className="text-warning">perdurará</span> para siempre</p>
                    </div>

                    <div className="col-12 col-md-6 d-flex align-items-center">
                        <div className="px-2">
                            Una de las cosas que nos inspiran es la cinematografía. 
                            Para nosotros cada uno de nuestros eventos, sesiones o desarrollos son una oportunidad más para contar tu historia a través de nuestra creatividad.
                            Somos conscientes de lo importante que es para ti ese momento y es por esto que nos enfocamos en documentar cada detalle para que puedas recordarlo toda la vida <span className="fst-italic">(o al menos en tu instagram)</span>
                        </div>
                    </div>
                </div>
            </div>

            <Carousel infoCarouselImgs={ carouselHomeSecond }/>

            <div className="container-fluid py-5">
                <div className="row">
                    <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-center">
                        <img src="/img/home/home-manu.jpg" alt="manuelozada" className="rounded-circle border-ag-yellow" width={180} />
                        <div className="text-center mb-3">
                            <h2 className="font-bebas mt-3">Manuel Lozada</h2>
                            <p className="fw-bolder">Web Developer <span className="text-warning">/</span> Videógrafo <span className="text-warning">/</span> Drone Pilot</p>
                            <p className="px-5 pb-4">
                                Desde pequeño se enamoró por el mundo de la tecnología. Especialmente del desarrollo de aplicaciones.
                                Además, su gran pasión siempre ha sido llevar el cine a cualquier evento donde participa haciendo magia con sus pequeños cortometrajes.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 d-flex flex-column align-items-center justify-content-start">
                        <img src="/img/home/home-luis.jpg" alt="luisalvarado" className="rounded-circle" width={180} />
                        <div className="text-center mb-3">
                            <h2 className="font-bebas mt-3">Luis Alvarado</h2>
                            <p className="fw-bolder">Fotógrafo <span className="text-warning">/</span> Videógrafo <span className="text-warning">/</span> Drone Pilot</p>
                            <p className="px-5">
                                Gran personaje. En principio, te aseguramos que no pararás de reir en tu evento. Apasionado por lo que hace.
                                Cuenta con una amplia trayectoria de más de 10 años en el mundo de la fotografía.
                                En los últimos 5 años descubrió nuevos talentos ocultos, ¡ser piloto de drone y videógrafo!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container text-center mb-5">
                <h3 className="font-bebas">síguenos</h3>
                <div className="d-flex justify-content-center">
                    <div className="mx-3"><FaInstagram size={20} className="text-warning"/> agavemedia <span className="text-warning">/</span> manuelozada11 <span className="text-warning">/</span> luisalvaradol</div>
                </div>
            </div>
        </div>
    );
}
 
export default Home;