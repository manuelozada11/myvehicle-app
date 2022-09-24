import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { defaultCatcher } from "../config/defaultCatcher";
import { useAuth } from "../hooks/useAuth";
import { useForm } from 'react-hook-form';

const Login = () => {
    let navigate = useNavigate();
    const { signIn } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [error, setError] = useState();

    const onSignIn = async (data) => {
        try {
            setError(null);
            const response = await signIn(data);
            
            if (response.code === 200) navigate(`/user`);
        } catch (e) {
            defaultCatcher(e);

            if (e.code === 404) return setError(e.message);

            return setError('Ocurrió un error, intenta de nuevo en unos minutos');
        }
    }

    const onReset = () => {
        reset();
        setError(null);
    }

    return (
        <div className="container-fluid p-0 text-center">
            <div style={{ borderRadius: '1.5rem', backgroundColor: "#293331e3", color: "#2b2b2b" }}
                className="p-5 m-3 text-center shadow">
                <h1 className="font-bebas text-light" style={{ fontSize: '3rem' }}>
                    INICIAR <span className="color-primary">SESION</span>
                </h1>
            </div>

            <form onSubmit={ handleSubmit(onSignIn) } className="p-5 d-flex flex-column align-items-center">
                <div className="mb-4">
                    <h6><span className="text-danger fw-bold">*</span> Usuario:</h6>
                    <input className={ `form-control ${ errors.username ? 'is-invalid' : '' }` }
                        {...register("username", { required: { value: true, message: 'Campo obligatorio' } })} type="text" />
                    { errors.username && <p className="mt-1 text-danger">{ errors.username.message }</p> }
                </div>

                <div className="mb-4">
                    <h6><span className="text-danger fw-bold">*</span> Contrasena:</h6>
                    <input className={ `form-control ${ errors.password ? 'is-invalid' : '' }` }
                        {...register("password", { required: { value: true, message: 'Campo obligatorio' } })} type="password" />
                    { errors.password && <p className="mt-1 text-danger">{ errors.password.message }</p> }
                </div>

                <div>
                    { error && <p className="mb-2 text-danger">{ error }</p> }
                </div>

                <div className="p-2">
                    <button className="btn btn-outline-primary m-2" onClick={ onReset } type="reset">Limpiar</button>
                    <button className="btn btn-primary m-2" type="submit">Aceptar</button>
                </div>
            </form>
        </div>
    );
}
 
export default Login;