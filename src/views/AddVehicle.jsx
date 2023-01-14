import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { useForm } from "react-hook-form";
import { firstLetterUppercase, translate } from "../common/utils";
import CarTitle from "../components/CarTitle";

const AddVehicle = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();
    const [gasoline, setGasoline] = useState(true);
    const { createVehicle } = useVehicle();
    const [error, setError] = useState(null);

    const onCreateCar = async (data) => {
        try {
            clearErrors(null);
            data.manufacture = firstLetterUppercase(data.manufacture.trim());
            data.model = firstLetterUppercase(data.model.trim());
            data.plateNumber = data.plateNumber.toString().trim().toUpperCase();
            data.year = Number(data.year);
            data.displacement = Number(data.displacement);

            await createVehicle(data);

            navigate(`/user`);
        } catch (e) {
            // defaultCatcher(e);

            return setError('Ocurrió un error, intenta de nuevo en unos minutos');
        }
    }

    const onReset = () => {
        reset();
        setError(null);
    }

    return (
        <div className="container-fluid px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                <CarTitle
                    backTo="/user"
                    title={translate("vehicle.add.title")}
                    subtitle={translate("vehicle.add.subtitle")} />
            </div>

            <form onSubmit={ handleSubmit(onCreateCar) } className="m-0 p-0">
                <div className="p-4 m-3 shadow border"
                    style={{ borderRadius: "1.5rem", backgroundColor: "#e4e4e4" }}>
                    <div className="my-2">
                        <p className="mb-1 fw-bold"><span className="text-danger fw-bold">*</span> Marca</p>
                        <input type="text" 
                            className={ `form-control form-control-sm rounded-pill ${ errors.manufacture ? 'is-invalid' : '' }` }
                            {...register("manufacture", { required: true })} />
                    </div>
                    
                    <div className="my-2">
                        <p className="mb-1 mt-3 fw-bold"><span className="text-danger fw-bold">*</span> Modelo</p>
                        <input type="text" 
                            className={ `form-control form-control-sm rounded-pill ${ errors.model ? 'is-invalid' : '' }` }
                            {...register("model", { required: true })} />
                    </div>

                    <div className="my-2">
                        <p className="mb-1 mt-3 fw-bold"><span className="text-danger fw-bold">*</span> Número de placa</p>
                        <input type="text" 
                            className={ `form-control form-control-sm rounded-pill ${ errors.plateNumber ? 'is-invalid' : '' }` }
                            {...register("plateNumber", { required: true })} />
                    </div>
                    
                    <div className="row my-2 mx-0">
                        <div className="col-6 ps-0">
                            <p className="mb-1 mt-1 fw-bold">Año</p>
                            <input type="number" 
                                className="form-control form-control-sm rounded-pill"
                                {...register("year")} />
                        </div>

                        <div className="col-6 pe-0">
                            <p className="mb-1 mt-1 fw-bold">Km</p>
                            <input type="number" 
                                className="form-control form-control-sm rounded-pill" 
                                {...register("displacement")} />
                        </div>
                    </div>

                    <div className="my-2">
                        <p className="mb-1 mt-3 fw-bold"><span className="text-danger fw-bold">*</span> Tipo de energía</p>
                        <div className="d-flex">
                            <div className="me-3 form-check">
                                <input className="form-check-input"
                                    {...register("type")}
                                    value="gasoline"
                                    type="radio" 
                                    name="type" id="radioGasoline" 
                                    checked={ gasoline }
                                    onChange={ () => setGasoline(true) } />
                                <label className="form-check-label" htmlFor="radioGasoline">
                                    Combustible
                                </label>
                            </div>

                            <div className="ms-3 form-check">
                                <input className="form-check-input" 
                                    {...register("type")}
                                    value="electric"
                                    type="radio" 
                                    name="type" id="radioElectric"
                                    checked={ !gasoline }
                                    onChange={ () => setGasoline(false) } />
                                <label className="form-check-label" htmlFor="radioElectric">
                                    Eléctrico
                                </label>
                            </div>
                        </div>
                    </div>

                    { gasoline &&
                        <div className="my-2">
                            <p className="mb-1 mt-3 fw-bold"><span className="text-danger fw-bold">*</span> Combustible utilizado</p>
                            <div className="d-flex">
                                <div className="me-4 form-check">
                                    <input className="form-check-input"
                                        {...register("energyType")}
                                        value="95"
                                        type="radio" 
                                        name="energyType" id="radio95" 
                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="radio95">
                                        95
                                    </label>
                                </div>

                                <div className="mx-4 form-check">
                                    <input className="form-check-input" 
                                        {...register("energyType")}
                                        value="91"
                                        type="radio" 
                                        name="energyType" id="radio91" />
                                    <label className="form-check-label" htmlFor="radio91">
                                        91
                                    </label>
                                </div>

                                <div className="ms-4 form-check">
                                    <input className="form-check-input"
                                        {...register("energyType")}
                                        value="diesel"
                                        type="radio" 
                                        name="energyType" id="radioDiesel" />
                                    <label className="form-check-label" htmlFor="radioDiesel">
                                        Diesel
                                    </label>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                
                <div className="text-center">
                    { error && <p className="px-3 pt-3 mt-2 mb-0 text-danger">{ error }</p> }
                </div>

                <div className="mt-2 mb-4 pt-2 d-flex flex-column">
                    <button type="reset"
                        onClick={ onReset }
                        className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">
                        Limpiar
                    </button>
                    <button type="submit" className="btn btn-block rounded-pill btn-primary mx-3 my-2">
                        Aceptar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddVehicle;