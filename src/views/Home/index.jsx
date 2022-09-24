import './index.css';

const Home = () => {

    return (
        <div className="container-fluid px-0">
            <div style={{ borderRadius: '1.5rem', backgroundColor: "#293331e3", color: "#2b2b2b" }}
                className="p-5 m-3 text-center shadow">
                <h1 className="font-bebas home-title text-light">
                    Tu <span className="color-primary">vehiculo</span>,
                    en un solo lugar
                </h1>
            </div>

            <div className="container-fluid px-5 h-100">
                <h1 className="mt-5 ms-3 font-bebas mb-0">
                    <span className='color-primary'>hola,</span>
                </h1>

                <p className="mb-5 ms-3">
                    <span className="fs-bold">Incia sesión</span> para ver tu información
                </p>
            </div>
        </div>
    );
}
 
export default Home;