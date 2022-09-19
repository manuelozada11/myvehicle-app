import './index.css';

const Home = () => {

    return (
        <div className="container-fluid px-0">
            <div className="container-fluid p-5 agave-bg-dark text-light text-center">
                <h1 className="font-bebas home-title">
                    MY VEHICLE <span className="color-primary">APP</span>
                </h1>
            </div>

            <div className="container-fluid px-5 h-100">
                <h1 className="mt-5 ms-4 font-bebas mb-0">
                    hola,
                </h1>

                <p className="mb-5 ms-4">
                    <span className="color-primary">Incia sesión</span> para ver tu información
                </p>
            </div>
        </div>
    );
}
 
export default Home;