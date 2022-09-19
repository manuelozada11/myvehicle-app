const Login = () => {
    return (
        <div className="container-fluid p-0 text-center">
            <div className="p-2 agave-bg-dark text-light">
                <h1 className="font-bebas home-title">
                    INICIAR <span className="color-primary">SESION</span>
                </h1>
            </div>

            <form action="" className="p-5 d-flex flex-column align-items-center">
                <div className="mb-4">
                    <h6>Usuario:</h6>
                    <input className="form-control" type="text" />
                </div>

                <div className="mb-4">
                    <h6>Contrasena:</h6>
                    <input className="form-control" type="text" />
                </div>

                <button className="btn btn-primary" type="submit">Aceptar</button>
            </form>
        </div>
    );
}
 
export default Login;