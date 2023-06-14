import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaintenance } from "../hooks";
import { useForm, Controller } from "react-hook-form";
import { firstLetterUppercase, getStorageValue, translate } from "../common/utils";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { useEffect } from "react";
import CarTitle from "../components/CarTitle";

const AddRefuel = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, clearErrors, reset } = useForm();
    const [stations, setStations] = useState(null);
    const [vehicle,] = useState(getStorageValue('vehicle'))
    const [stationSelected, setStationSelected] = useState(null);
    const { createRefuel } = useMaintenance();
    const [error, setError] = useState(null);

    const handleColor = (time) => {
        return time.getHours() > 12 ? "text-success" : "text-error";
    };

    const onCreateRefuel = async (data) => {
        try {
            clearErrors(null);
            if (!stationSelected) return setError('Debes elegir una estación')

            if (typeof data.date === "undefined") data.date = new Date();
            data.amount = Number(data.amount);
            data.quantity = Number(data.quantity);
            data.displacement = Number(data.displacement ?? 0);
            data.gasStation = {
                name: stationSelected,
                location: firstLetterUppercase(data.location.trim())
            }

            delete data.location;

            const { _id } = vehicle;

            await createRefuel({ _id, data });

            navigate(`/refuels/v/${ _id }`);
        } catch (e) {
            // defaultCatcher(e);

            return setCustomError(translate("vehicle.api.error.wentWrong"));
        }
    }

    const onReset = () => {
        setStationSelected(null);
        reset();
        setError(null);
    }

    useEffect(() => {
        const country = getStorageValue('user').country;
        
        if (country === 'panama')
            setStations([
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
        else 
            setStations([
                {
                    path: "/pdv.png",
                    name: "PDV",
                    _id: "123"
                }
            ]);
    }, []);

    return (
        <div className="container-fluid main-container px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                <CarTitle  
                    backTo={ vehicle ? `/refuels/v/${ vehicle._id }` : ""}
                    title={translate("vehicle.refuels.add.title")} 
                    subtitle={translate("vehicle.refuels.add.subtitle")} />
            </div>

            <form onSubmit={ handleSubmit(onCreateRefuel) } className="m-0 p-0">
                <div className="p-4 m-3 shadow border"
                    style={{ borderRadius: "1.5rem", backgroundColor: "#e4e4e4" }}>
                    <div className="row mb-3 mx-0">
                        <div className="col-6 ps-0">
                            <p className="my-1 fw-bold"><span className="text-danger fw-bold">*</span> {translate("vehicle.refuels.add.lts")}</p>
                            <input type="number" 
                                step="0.001"
                                className={ `form-control form-control-sm rounded-pill ${ errors.quantity ? 'is-invalid' : '' }` }
                                {...register("quantity", { required: true })} />
                        </div>

                        <div className="col-6 ps-0">
                            <p className="my-1 fw-bold"><span className="text-danger fw-bold">*</span> {translate("vehicle.refuels.add.amount")} ($)</p>
                            <input type="number" 
                                step="0.001"
                                className={ `form-control form-control-sm rounded-pill ${ errors.amount ? 'is-invalid' : '' }` }
                                {...register("amount", { required: true })} />
                        </div>
                    </div>
                    
                    <div className="my-2">
                        <div className="row mb-3 mx-0">
                            <div className="col-6 ps-0">
                                <p className="my-1 fw-bold"><span className="text-danger fw-bold">*</span> {translate("vehicle.refuels.add.location")}</p>
                                <input type="text" 
                                    className={ `form-control form-control-sm rounded-pill ${ errors.location ? 'is-invalid' : '' }` }
                                    {...register("location", { required: true })} />
                            </div>
                            
                            <div className="col-6 ps-0">
                                <p className="ms-2 my-1 fw-bold">{translate("vehicle.refuels.add.displacement")}</p>
                                <input type="number" 
                                    step="0.01"
                                    className="form-control form-control-sm rounded-pill"
                                    {...register("displacement")} />
                            </div>
                        </div>
                    </div>

                    <div className="my-2">
                        <p className="mb-1 mt-3 ms-2 fw-bold">{translate("vehicle.refuels.add.date")}</p>
                        <Controller
                            control={control}
                            name="date"
                            render={({ field: { onChange, onBlur, value, ref } }) => (
                                <DatePicker
                                    showTimeSelect
                                    onChange={ onChange }
                                    onBlur={ onBlur }
                                    selected={ value ? value : new Date() }
                                    timeClassName={ handleColor }
                                    className="form-control form-control-sm rounded-pill"
                                />
                            )}
                        />
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