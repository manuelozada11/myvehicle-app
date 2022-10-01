import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaintenance } from "../hooks";
import { useForm, Controller } from "react-hook-form";
import { firstLetterUppercase, getStorageValue } from "../common/utils";
import BackButton from '../components/BackButton';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

const AddRefuel = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, clearErrors, reset } = useForm();
    const [stations, setStations] = useState([
        {
            path: "/puma.png",
            name: "Puma",
            _id: "123"
        },
        {
            path: "/terpel.png",
            name: "Terpel",
            _id: "234"
        },
        {
            path: "/texaco.png",
            name: "Texaco",
            _id: "456"
        },
        {
            path: "/delta.png",
            name: "Delta",
            _id: "678"
        }
    ]);
    const [vehicle,] = useState(getStorageValue('vehicle'))
    const [stationSelected, setStationSelected] = useState(null);
    const { createRefuel } = useMaintenance();
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    const handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };
    
    const onGoBack = () => {
        navigate(`/refuels/v/${ vehicle._id }`);
    }

    const onCreateRefuel = async (data) => {
        try {
            clearErrors(null);
            if (!stationSelected) return setError('Debes elegir una estación')

            data.amount = Number(data.amount);
            data.quantity = Number(data.quantity);
            data.gasStation = {
                name: stationSelected,
                location: firstLetterUppercase(data.location.trim())
            }

            delete data.location;

            const { _id } = vehicle;

            await createRefuel({ _id, data });

            navigate(`/vehicle/${ _id }`);
        } catch (e) {
            // defaultCatcher(e);

            return setError('Ocurrió un error, intenta de nuevo en unos minutos');
        }
    }

    const onReset = () => {
        setStationSelected(null);
        reset();
        setError(null);
    }

    return (
        <div className="container-fluid px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                <div className="col-9 ps-0">
                    <h1 className="m-0 fw-bold">
                        Agregar recarga
                    </h1>
                    <p className="m-0">
                        Introduce los datos solicitados
                    </p>
                </div>

                <div className="pe-0 col-3 d-flex justify-content-end align-items-center">
                    <BackButton onClick={ onGoBack } />
                </div>
            </div>

            <form onSubmit={ handleSubmit(onCreateRefuel) } className="m-0 p-0">
                <div className="p-4 m-3 shadow border"
                    style={{ borderRadius: "1.5rem", backgroundColor: "#e4e4e4" }}>
                    <div className="row mb-3 mx-0">
                        <div className="col-6 ps-0">
                            <p className="mb-1 mt-1 fw-bold"><span className="text-danger fw-bold">*</span> Lts</p>
                            <input type="number" 
                                step="0.01"
                                className={ `form-control form-control-sm rounded-pill ${ errors.quantity ? 'is-invalid' : '' }` }
                                {...register("quantity", { required: true })} />
                        </div>

                        <div className="col-6 ps-0">
                            <p className="mb-1 mt-1 fw-bold"><span className="text-danger fw-bold">*</span> Monto ($)</p>
                            <input type="number" 
                                step="0.01"
                                className={ `form-control form-control-sm rounded-pill ${ errors.amount ? 'is-invalid' : '' }` }
                                {...register("amount", { required: true })} />
                        </div>
                    </div>
                    
                    <div className="my-2">
                        <p className="mb-1 mt-3 fw-bold"><span className="text-danger fw-bold">*</span> Ubicación</p>
                        <input type="text" 
                            className={ `form-control form-control-sm rounded-pill ${ errors.location ? 'is-invalid' : '' }` }
                            {...register("location", { required: true })} />
                    </div>

                    <div className="my-2">
                        <p className="mb-1 mt-3 fw-bold">Fecha</p>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                    showTimeSelect
                                    onChange={ onChange }
                                    onBlur={ onBlur }
                                    selected={ value }
                                    timeClassName={ handleColor }
                                    className="form-control form-control-sm rounded-pill"
                                />
                            )}
                        />
                    </div>
                
                    <div className="my-2">
                        <p className="mb-1 mt-3 fw-bold"><span className="text-danger fw-bold">*</span> Combustible utilizado</p>
                        <div className="d-flex">
                            <div className="me-4 form-check">
                                <input className="form-check-input"
                                    {...register("fuel")}
                                    value="95"
                                    type="radio" 
                                    name="fuel" id="radio95" 
                                    defaultChecked />
                                <label className="form-check-label" htmlFor="radio95">
                                    95
                                </label>
                            </div>

                            <div className="mx-4 form-check">
                                <input className="form-check-input" 
                                    {...register("fuel")}
                                    value="91"
                                    type="radio" 
                                    name="fuel" id="radio91" />
                                <label className="form-check-label" htmlFor="radio91">
                                    91
                                </label>
                            </div>

                            <div className="ms-4 form-check">
                                <input className="form-check-input"
                                    {...register("fuel")}
                                    value="diesel"
                                    type="radio" 
                                    name="fuel" id="radioDiesel" />
                                <label className="form-check-label" htmlFor="radioDiesel">
                                    Diesel
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mx-0 px-2 text-center">
                    { stations === null
                        ? <p>Loading...</p>
                        : stations.map((station) => (
                            <div className="col-6 p-2" key={station._id}>
                                <div onClick={() => setStationSelected(station.name)}
                                    className={ `station-card border h-100 d-flex justify-content-center align-items-center ${ stationSelected === station.name ? "station-card-focus" : '' }` }>
                                    <img src={ `/img${station.path}` } 
                                        alt={station.name} 
                                        width="100%" />
                                </div>
                            </div>
                        ))
                    }
                </div>
                
                <div className="text-center">
                    { error && <p className="px-3 pt-3 mt-2 mb-2 text-danger">{ error }</p> }
                </div>

                <div className="mt-2 mb-4 d-flex flex-column">
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

export default AddRefuel;