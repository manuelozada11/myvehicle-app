import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { IoChevronBackCircleSharp, IoTrashOutline } from 'react-icons/io5';
import { RiGasStationFill } from 'react-icons/ri';
import { useForm } from "react-hook-form";

const VehicleDetails = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { _id } = useParams();
    const { getVehiclesById, deleteCarById } = useVehicle();
    const [car, setCar] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(null);
    
    const onGoBack = () => {
        navigate('/user');
    }

    const onDeleteCar = async (data) => {
        try {
            if (data.delete !== car.plateNumber) return setError('La placa no coincide');

            await deleteCarById({ _id });

            navigate(`/user`);
        } catch (e) {
            // defaultCatcher(e);

            return setError('Ocurrió un error, intenta de nuevo en unos minutos');
        }
    }

    const onCancel = () => {
        setConfirm(false);
        reset();
        setError(null);
    }

    const onRefuel = () => {}

    useEffect(() => {
        const getVehicle = async () => {
            try {
                const car = await getVehiclesById({ _id });
                setCar(car);
            } catch (e) {
                setCar({});
            }
        }
        !car?.hasOwnProperty('_id') && getVehicle();
    }, []);

    return (
        <div className="container-fluid px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                { car === null
                    ? <div className="col-12 px-0"><h1 className="m-0 fw-bold">Loading ...</h1></div>
                    : <>
                        <div className="col-9 ps-0">
                            <h1 className="m-0 fw-bold">
                                { (car?.hasOwnProperty('manufacture') ? `${ car.manufacture } ${ car.model }` : '') }
                            </h1>
                            <p className="m-0">
                                { (car?.hasOwnProperty('plateNumber') ? `${ car.plateNumber }` : '') }
                            </p>
                        </div>
        
                        <div className="pe-0 col-3 d-flex justify-content-end align-items-center">
                            <IoChevronBackCircleSharp onClick={ onGoBack } size={ 45 } className="color-secondary" />
                        </div>
                    </>
                }
                
            </div>

            <div className="p-4 m-3 shadow border"
                style={{ borderRadius: "1.5rem", backgroundColor: "#e4e4e4" }}>
                <div className="my-2">
                    <h4 className="m-0 fw-bold">Año</h4>
                    <p>{ (car?.hasOwnProperty('year') ? `${ car.year }` : '') }</p>
                </div>
                
                <div className="my-2">
                    <h4 className="m-0 fw-bold">Distancia recorrida</h4>
                    <p>{ (car?.hasOwnProperty('displacement') ? `${ car.displacement }` : '') } Km</p>
                </div>
                
                <div className="my-2">
                    <h4 className="m-0 fw-bold">Combustible</h4>
                    <p className="mb-0">{ (car?.hasOwnProperty('type') ? (car.energyType !== 'diesel' && car.type) : '') } { (car?.hasOwnProperty('energyType') ? `${ car.energyType }` : '') }</p>
                </div>
            </div>

            <div className="mt-4 pt-2 d-flex justify-content-center">
                <button type="button" className="p-2 btn rounded-circle btn-outline-primary m-2"><RiGasStationFill size={ 30 } /></button>
                { !confirm && <button type="button" onClick={ () => setConfirm(true) } className="p-2 btn rounded-circle btn-outline-danger m-2"><IoTrashOutline size={ 27 } /></button> }
                {/* <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Mantenimientos</button> */}
                {/* <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Estadisticas</button> */}
            </div>

            { confirm &&
                <form onSubmit={ handleSubmit(onDeleteCar) }
                    className="py-3 px-4 d-flex flex-column">
                    <p className="mb-1">Escribe la placa <span className="fst-italic fw-bold">{ (car?.hasOwnProperty('plateNumber') ? `${ car.plateNumber }` : '') }</span> para confirmar</p>
                    <input type="text" 
                        {...register("delete", { required: true })}
                        className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.delete ? 'is-invalid' : '' }` } />

                    <div className="row mx-0">
                        <button type="button" onClick={ onCancel } className="my-2 btn btn-block btn-sm btn-danger rounded-pill">Cancelar</button>
                        <button type="submit" className="my-2 btn btn-block btn-sm btn-outline-danger rounded-pill">Aceptar</button>
                    </div>
                    
                    <div className="text-center">
                        { error && <p className="px-3 pt-3 text-danger">{ error }</p> }
                    </div>
                </form>
            }
        </div>
    );
}

export default VehicleDetails;