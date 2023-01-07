import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { IoTrashOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { RiGasStationFill, RiShareForwardLine, RiCalendarCheckLine } from 'react-icons/ri';
import { FaRoute } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import BackButton from "../components/BackButton";
import { getStorageValue, translate } from "../common/utils";
import CustomQrCode from "../components/CustomQrCode";

const VehicleDetails = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { _id } = useParams();
    const { getVehiclesInfoById, deleteCarById } = useVehicle();
    const [car, setCar] = useState(null);
    const [qrcode, setQrcode] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [error, setError] = useState(null);
    const [permissions, setPermissions] = useState(false);
    
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
    
    const handleTitle = () => {
        const car = getStorageValue('vehicle');
        return (
            <>
                <div className="col-9 ps-0">
                    <h1 className="m-0 fw-bold">
                        { car.fullname }
                    </h1>
                    <p className="m-0">
                        { car.plateNumber }
                    </p>
                </div>

                <div className="pe-0 col-3 d-flex justify-content-end align-items-center">
                    <BackButton onClick={ onGoBack } />
                </div>
            </>
        );
    }

    useEffect(() => {
        const getVehicle = async () => {
            try {
                const car = await getVehiclesInfoById({ _id });
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
                { handleTitle() }
            </div>

            <div className="d-flex justify-content-center">
                <button type="button" onClick={ () => navigate(`/vehicle/info/${ _id }`) } className="p-2 btn rounded-circle btn-outline-primary m-2"><IoDocumentTextOutline size={ 27 } /></button>
                <button type="button" onClick={ () => navigate(`/refuels/v/${ _id }`) } className="p-2 btn rounded-circle btn-outline-primary m-2"><RiGasStationFill size={ 30 } /></button>
                <button type="button" onClick={ () => setQrcode(true) } className="p-2 btn rounded-circle btn-outline-primary m-2"><RiShareForwardLine size={ 30 } /></button>
                { !confirm && <button type="button" onClick={ () => setConfirm(true) } className="p-2 btn rounded-circle btn-outline-danger m-2"><IoTrashOutline size={ 27 } /></button> }
                {/* <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Mantenimientos</button> */}
                {/* <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Estadisticas</button> */}
            </div>

            <div className="p-4 m-3 shadow border"
                style={{ borderRadius: "1.5rem", backgroundColor: "#e4e4e4" }}>
                <div className="row mx-0">
                    <div className="col-4 my-2 p-0">
                        <p className="mb-1 fw-bold d-flex align-items-center"><RiCalendarCheckLine className="me-2" size={ 25 } />{translate("vehicle.details.year")}</p>
                        <h2 className="fw-light mb-0">{ (car?.hasOwnProperty('year') ? `${ car.year }` : '') }</h2>
                    </div>
                    
                    <div className="col-8 my-2 p-0">
                        <p className="mb-1 fw-bold d-flex align-items-center"><FaRoute className="me-2" size={ 23 } />{translate("vehicle.details.displacement")}</p>
                        <h2 className="fw-light mb-0">{ (car?.hasOwnProperty('displacement') ? `${ car.displacement }` : '') } Km</h2>
                    </div>
                </div>
                
                <div className="my-2">
                    <p className="mb-1 fw-bold d-flex align-items-center"><RiGasStationFill className="me-2" size={ 25 } />{translate("vehicle.details.energytype")}</p>
                    <h2 className="fw-light mb-0">{ (car?.hasOwnProperty('type') ? (car.energyType !== 'diesel' && car.type) : '') } { (car?.hasOwnProperty('energyType') ? `${ car.energyType }` : '') }</h2>
                </div>
            </div>

            { confirm &&
                <form onSubmit={ handleSubmit(onDeleteCar) }
                    className="py-3 px-4 d-flex flex-column">
                    <p className="mb-1">{translate("vehicle.details.delete.title1")} <span className="fst-italic fw-bold">{ (car?.hasOwnProperty('plateNumber') ? `${ car.plateNumber }` : '') }</span> {translate("vehicle.details.delete.title2")}</p>
                    <input type="text" 
                        {...register("delete", { required: true })}
                        className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.delete ? 'is-invalid' : '' }` } />

                    <div className="row mx-0">
                        <button type="button" onClick={ onCancel } className="my-2 btn btn-block btn-sm btn-danger rounded-pill">{translate("vehicle.details.cancel")}</button>
                        <button type="submit" className="my-2 btn btn-block btn-sm btn-outline-danger rounded-pill">{translate("vehicle.details.accept")}</button>
                    </div>
                    
                    <div className="text-center">
                        { error && <p className="px-3 pt-3 text-danger">{ error }</p> }
                    </div>
                </form>
            }

            { qrcode &&
                <CustomQrCode 
                    value={ `${ car?._id }/${ permissions ? 0 : 1 }` }
                    onClose={ () => setQrcode(false) }
                />
            }
        </div>
    );
}

export default VehicleDetails;