import { useState } from "react";
import { useEffect } from "react";
import DatePicker from 'react-datepicker';
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { FiAlertCircle } from 'react-icons/fi';
import { IoTrashOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { RiGasStationFill, RiShareForwardLine, RiCalendarCheckLine } from 'react-icons/ri';
import { useForm, Controller } from "react-hook-form";
import { dateFormat, translate, getStorageValue, setStorageValue, removeItemStorage } from "../common/utils";
import { VEHICLE_TYPE } from "../constants/vehicles";
import CustomQrCode from "../components/CustomQrCode";
import CarTitle from "../components/CarTitle";

const VehicleInfo = () => {
    let navigate = useNavigate();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const { _id } = useParams();
    const { getVehiclesById, updateCarById, deleteCarById, authorizateTransfer } = useVehicle();
    const [car, setCar] = useState(null);
    const [edit, setEdit] = useState(false);
    const [update, setUpdate] = useState(false);
    const [error, setCustomError] = useState(null);
    const [confirm, setConfirm] = useState(false);
    const [qrcode, setQrcode] = useState(false);
    const [confirmTransfer, setConfirmTransfer] = useState(true);
    const [timer, setTimer] = useState(30);

    const handleDate = (date) => {
        const now = new Date().getTime();
        const insurance = new Date(date).getTime();

        if (now > insurance) return 'danger';

        return 'success';
    }

    const handleTypeOption = () => {
        return VEHICLE_TYPE.map((option, i) => {
            return (
                <option 
                    key={ `${option.value}${i}`} 
                    defaultValue={ car?.vehicleType === option.value ? true : false } 
                    value={ option.value }>
                    { option.name }
                </option>
            );
        })
    }

    const handleIntervals = (intervalTimer, intervalId, timeoutId) => {
        clearInterval(intervalTimer ?? JSON.parse(getStorageValue("intervalTimer")));
        clearInterval(intervalId ?? JSON.parse(getStorageValue("intervalId")));
        clearTimeout(timeoutId ?? JSON.parse(getStorageValue("timeoutId")));
        setTimer(30);
        setQrcode(false);
        removeItemStorage("intervalTimer");
        removeItemStorage("intervalId");
        removeItemStorage("timeoutId");
    }

    const onDeleteCar = async (data) => {
        try {
            if (data.delete !== car.plateNumber) return setCustomError('La placa no coincide');

            await deleteCarById({ _id });

            navigate(`/user`);
        } catch (e) {
            // defaultCatcher(e);

            return setCustomError(translate("vehicle.api.error.wentWrong"));
        }
    }

    const onEditCar = async (data) => {
        try {
            if (typeof data.boughtDate === "undefined") data.boughtDate = (car?.boughtDate ?? new Date());
            
            if (typeof data.insuranceDate === "undefined") data.insuranceDate = (car?.insuranceDate ?? new Date());
            
            if (typeof data.taxesDate === "undefined") data.taxesDate = (car?.taxesDate ?? new Date());

            data.year = Number(data.year);
            data.passengers = Number(data.passengers);
            data.displacement = Number(data.displacement);

            setCar(null);
            setEdit(false);
            setUpdate(!update);

            await updateCarById({ _id, ...data });
        } catch (e) {
            // defaultCatcher(e);
            return setCustomError(translate("vehicle.api.error.wentWrong"));
        }
    }

    const onCancel = () => {
        setEdit(false);
        reset();
        setCustomError(null);
        setConfirm(false);
    }

    const onTransfer = async () => {
        try {
            const _userId = getStorageValue("user")?._id;
            setConfirmTransfer(false);
            await authorizateTransfer({ _id });

            const intervalTimer = setInterval(() => setTimer(oldTimer => oldTimer -1), 1000);

            const intervalId = setInterval(async () => {
                console.log('requesting to API...');
                try {
                    const car = await getVehiclesById({ _id });
                    if (car?.user._id !== _userId) {
                        console.log("car was transfered");
                        handleIntervals(intervalTimer, intervalId, timeoutId);
                        navigate(`/user`);
                    }
                } catch (e) {
                    handleIntervals(intervalTimer, intervalId, timeoutId);
                    setCustomError("Algo salió mal!");
                }
            }, 2000);

            const timeoutId = setTimeout(() => handleIntervals(intervalTimer, intervalId, timeoutId), 30000);
            setStorageValue("intervalTimer", JSON.stringify(intervalTimer));
            setStorageValue("intervalId", JSON.stringify(intervalId));
            setStorageValue("timeoutId", JSON.stringify(timeoutId));
        } catch (e) {
            // defaultCatcher(e);
            
            return setCustomError(translate("vehicle.api.error.wentWrong"));
        }
    }

    useEffect(() => {
        const getVehicle = async () => {
            try {
                const car = await getVehiclesById({ _id });
                setStorageValue('vehicle', {
                    fullname: `${ car?.manufacture } ${ car?.model }`,
                    plateNumber: car?.plateNumber ?? "-",
                    user: car.user,
                    _id: car._id
                });
                setUpdate(!update);
                setCar(car);
            } catch (e) {
                setCar({});
            }
        }
        !car?.hasOwnProperty('_id') && getVehicle();
    }, [update]);

    return (
        <div className="container-fluid main-container px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                <CarTitle backTo={ `/vehicle/${ _id }` } update={ update } />
            </div>
            
            <div className="d-flex justify-content-center">
                <button type="button" onClick={ () => { setConfirmTransfer(true); setQrcode(true); } } className="p-2 btn rounded-circle btn-outline-danger m-2"><RiShareForwardLine size={ 30 } /></button>
                {/* { !confirm && <button type="button" onClick={ () => setConfirm(true) } className="p-2 btn rounded-circle btn-outline-danger m-2"><IoTrashOutline size={ 27 } /></button> } */}
            </div>
            
            { confirm &&
                <form onSubmit={ handleSubmit(onDeleteCar) }
                    className="py-3 px-4 d-flex flex-column">
                    <p className="mb-1">{translate("vehicle.details.delete.title1")} <span className="fst-italic fw-bold">{ (car?.hasOwnProperty('plateNumber') ? `${ car.plateNumber }` : '') }</span> {translate("vehicle.details.delete.title2")}</p>
                    <input type="text" 
                        {...register("delete", { required: true })}
                        className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.delete ? 'is-invalid' : '' }` }
                    />

                    <div className="row mx-0">
                        <button type="button" onClick={ onCancel } className="my-2 btn btn-block btn-sm btn-danger rounded-pill">{translate("vehicle.details.cancel")}</button>
                        <button type="submit" className="my-2 btn btn-block btn-sm btn-outline-danger rounded-pill">{translate("vehicle.details.accept")}</button>
                    </div>
                    
                    <div className="text-center">
                        { error && <p className="px-3 pt-3 text-danger">{ error }</p> }
                    </div>
                </form>
            }

            <form onSubmit={ handleSubmit(onEditCar) }>
                <div className="p-4 m-3 shadow border"
                    style={{ borderRadius: "1.5rem", backgroundColor: "#e4e4e4" }}>
                    <h1 className="mb-3" style={{ fontWeight: '900' }}>
                        {translate("vehicle.information.title")} { !edit && <AiOutlineEdit className="ms-1 cursor-pointer" size={ 27 } onClick={ () => setEdit(true) } /> }
                    </h1>

                    <div className="my-2">
                        <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' }` }>{translate("vehicle.information.boughtDate")}</h5>
                        { edit ?
                            <Controller
                                control={control}
                                name="boughtDate"
                                render={({ field: { onChange, onBlur, value, ref } }) => (
                                    <DatePicker
                                        showTimeSelect
                                        onChange={ onChange }
                                        onBlur={ onBlur }
                                        selected={ value ? value : (car?.boughtDate ? new Date(car.boughtDate) : new Date()) }
                                        className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.boughtDate ? 'is-invalid' : '' }` }
                                    />
                                )}
                            />
                            : (car?.boughtDate ? <p className="m-0">{ dateFormat(car?.boughtDate).split(', ')[0] }</p> : '-')
                        }
                    </div>

                    <div className="row mx-0 my-2">
                        <div className="col-6 ps-0">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' }` }>{translate("vehicle.information.color")}</h5>
                            { edit ?    
                                <input type="text" 
                                    {...register("color", { required: true })}
                                    defaultValue={ `${ car?.color ?? '' }` }
                                    className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.color ? 'is-invalid' : '' }` } />
                                : `${ car?.color ?? '-' }` }
                        </div>
                        
                        <div className="col-6 p-0">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' }` }>{translate("vehicle.information.passengers")}</h5>
                            { edit ?    
                                <input type="number" 
                                    {...register("passengers", { required: true })}
                                    defaultValue={ car?.passengers ? car?.passengers : 0 }
                                    className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.passengers ? 'is-invalid' : '' }` } />
                                : `${ car?.passengers ?? '-'  }` }
                        </div>
                    </div>
                    
                    <div className="my-2">
                        <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' }` }>{translate("vehicle.information.vehicleType")}</h5>
                        { edit ?    
                            <select {...register("vehicleType", { required: true })}
                                className={ `mb-3 form-select form-select-sm rounded-pill shadow-sm ${ errors.vehicleType ? 'is-invalid' : '' }` } >
                                    { handleTypeOption() }
                                </select>
                            : `${ car?.vehicleType ?? '-'  }` }
                    </div>
                                    
                    <div className="my-2">
                        <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' }` }>{translate("vehicle.information.serial")}</h5>
                        { edit ?    
                            <input type="text" 
                                {...register("bodySerial", { required: true })}
                                defaultValue={ `${ car?.bodySerial ?? ''  }` }
                                className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.bodySerial ? 'is-invalid' : '' }` } />
                            : `${ car?.bodySerial ?? '-'  }` }
                    </div>
                    
                    <div className="row mx-0 my-2">
                        <div className="col-6 ps-0">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' }` }>{translate("vehicle.information.insurance")}</h5>
                            { edit ?
                                <Controller
                                    control={control}
                                    name="insuranceDate"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <DatePicker
                                            showTimeSelect
                                            onChange={ onChange }
                                            onBlur={ onBlur }
                                            selected={ value ? value : (car?.insuranceDate ? new Date(car.insuranceDate) : new Date()) }
                                            className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.insuranceDate ? 'is-invalid' : '' }` }
                                        />
                                    )}
                                />
                                : (car?.insuranceDate ? <p className={ `m-0 d-flex align-items-center fw-bold text-${ handleDate(car?.insuranceDate) }` }>{ dateFormat(car?.insuranceDate).split(', ')[0] } { handleDate(car?.insuranceDate) === 'success' ? <AiOutlineCheckCircle className="ms-1" size={20}/> : <FiAlertCircle className="ms-1" size={20}/> }</p> : '-')
                            }
                        </div>
                        
                        <div className="col-6 p-0">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' } `}>{translate("vehicle.information.taxes")}</h5>
                            { edit ?
                                <Controller
                                    control={control}
                                    name="taxesDate"
                                    render={({ field: { onChange, onBlur, value, ref } }) => (
                                        <DatePicker
                                            showTimeSelect
                                            onChange={ onChange }
                                            onBlur={ onBlur }
                                            selected={ value ? value : (car?.taxesDate ? new Date(car.taxesDate) : new Date()) }
                                            className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.taxesDate ? 'is-invalid' : '' }` }
                                        />
                                    )}
                                />
                                :   (car?.taxesDate 
                                    ? <p className={ `m-0 fw-bold d-flex align-items-center text-${ handleDate(car?.taxesDate) }` }>{ dateFormat(car?.taxesDate).split(', ')[0] } { handleDate(car?.taxesDate) === 'success' ? <AiOutlineCheckCircle className="ms-1" size={20}/> : <FiAlertCircle className="ms-1" size={20}/> }</p> 
                                    : '-')
                            }
                        </div>
                    </div>
                </div>

                <div className="p-4 mx-3 mb-3 mt-4 shadow border"
                    style={{ borderRadius: "1.5rem", backgroundColor: "#b6e2d9" }}>
                    <div className="row mx-0">
                        <div className="col-4 ps-0 py-2">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' } `}>{translate("vehicle.add.year")}</h5>
                            { edit ?    
                                <input type="number" 
                                    {...register("year", { required: true })}
                                    defaultValue={ car?.year ? car.year : 0 }
                                    className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.year ? 'is-invalid' : '' }` } />
                                : `${ car?.year ?? '-'  }` }
                        </div>
                        
                        <div className="col-8 pe-0 py-2">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-0 mb-2' : 'm-0' } `}>{translate("vehicle.add.displacement")}</h5>
                            { edit ?    
                                <input type="number" 
                                    {...register("displacement", { required: true })}
                                    defaultValue={ car?.displacement ? car.displacement : 0 }
                                    className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.displacement ? 'is-invalid' : '' }` } />
                                : `${ car?.displacement ?? '-'  }` }
                        </div>
                    </div>
                    
                    <div className="row mx-0">
                        <div className="col-6 ps-0 py-2">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-2 mb-2' : 'm-0' } `}>{translate("vehicle.add.manufacturer")}</h5>
                            { edit ?    
                                <input type="text" 
                                    {...register("manufacture", { required: true })}
                                    defaultValue={ car?.manufacture ?? '' }
                                    className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.manufacture ? 'is-invalid' : '' }` } />
                                : `${ car?.manufacture ?? '-'  }` }
                        </div>
                        
                        <div className="col-6 pe-0 py-2">
                            <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-2 mb-2' : 'm-0' } `}>{translate("vehicle.add.model")}</h5>
                            { edit ?    
                                <input type="text" 
                                    {...register("model", { required: true })}
                                    defaultValue={ car?.model ?? '' }
                                    className={ `mb-2 form-control form-control-sm rounded-pill shadow-sm ${ errors.model ? 'is-invalid' : '' }` } />
                                : `${ car?.model ?? '-'  }` }
                        </div>
                    </div>
                    
                    <div className="my-2">
                        <h5 className={ `fw-bold ${ edit ? 'mx-0 mt-2 mb-2' : 'm-0' } `}>{translate("vehicle.add.plateNumber")}</h5>
                        { edit ?    
                            <input type="text" 
                                {...register("plateNumber", { required: true })}
                                defaultValue={ car?.plateNumber ?? '' }
                                className={ `mb-3 form-control form-control-sm rounded-pill shadow-sm ${ errors.plateNumber ? 'is-invalid' : '' }` } />
                            : `${ car?.plateNumber ?? '-'  }` }
                    </div>

                    <div className="my-2">
                        <h4 className="m-0 fw-bold">{translate("vehicle.add.energyType")}</h4>
                        { edit ? 
                            <div className="d-flex">
                                <div className="me-4 form-check">
                                    <input className="form-check-input"
                                        {...register("energyType")}
                                        value="95"
                                        type="radio" 
                                        name="energyType" id="radio95" 
                                        defaultChecked={ car?.energyType === "95" ? true : false } />
                                    <label className="form-check-label" htmlFor="radio95">
                                        95
                                    </label>
                                </div>

                                <div className="mx-4 form-check">
                                    <input className="form-check-input" 
                                        {...register("energyType")}
                                        value="91"
                                        type="radio" 
                                        name="energyType" id="radio91"
                                        defaultChecked={ car?.energyType === "91" ? true : false } />
                                    <label className="form-check-label" htmlFor="radio91">
                                        91
                                    </label>
                                </div>

                                <div className="ms-4 form-check">
                                    <input className="form-check-input"
                                        {...register("energyType")}
                                        value="diesel"
                                        type="radio" 
                                        name="energyType" id="radioDiesel"
                                        defaultChecked={ car?.energyType === "diesel" ? true : false } />
                                    <label className="form-check-label" htmlFor="radioDiesel">
                                        Diesel
                                    </label>
                                </div>
                            </div> :
                            `${ (car?.hasOwnProperty('type') ? (car.energyType !== 'diesel' && car.type) : '') } ${ (car?.hasOwnProperty('energyType') ? `${ car.energyType }` : '') }`
                        }
                    </div>
                </div>

                { edit &&
                    <div className="py-2 px-4 d-flex flex-column">
                        <div className="row mx-0">
                            <button type="button" onClick={ onCancel } className="my-2 btn btn-block btn-sm btn-outline-primary rounded-pill">{translate("vehicle.details.cancel")}</button>
                            <button type="submit" className="my-2 btn btn-block btn-sm btn-primary rounded-pill">{translate("users.signin.submit")}</button>
                        </div>
                        
                        <div className="text-center">
                            { error && <p className="px-3 pt-3 text-danger">{ error }</p> }
                        </div>
                    </div>
                }
            </form>
            
            { qrcode &&
                <CustomQrCode 
                    value={ `${ car?._id }//${ getStorageValue("token") }` }
                    confirmation={ confirmTransfer }
                    title={ translate("vehicle.information.transfer.title") }
                    subtitle={ translate("vehicle.information.transfer.subtitle") }
                    onAccept={ onTransfer }
                    qrSubtitle={ `${ translate("vehicle.information.transfer.qrSubtitle") } ${ timer } ${ translate("vehicle.information.transfer.secs") }` }
                    onClose={ () => handleIntervals() }
                />
            }
        </div>
    );
}

export default VehicleInfo;