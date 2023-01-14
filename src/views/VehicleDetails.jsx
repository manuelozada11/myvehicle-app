import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { IoDocumentTextOutline } from 'react-icons/io5';
import { RiGasStationFill, RiShareForwardLine, RiCalendarCheckLine } from 'react-icons/ri';
import { FaRoute } from 'react-icons/fa';
import { BsTools } from 'react-icons/bs';
import { translate } from "../common/utils";
import CustomQrCode from "../components/CustomQrCode";
import CarTitle from "../components/CarTitle";

const VehicleDetails = () => {
    let navigate = useNavigate();
    const { _id } = useParams();
    const { getVehiclesInfoById } = useVehicle();
    const [car, setCar] = useState(null);
    const [qrcode, setQrcode] = useState(false);
    const [permissions, setPermissions] = useState(false);
    
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
                <CarTitle backTo={ '/user' } />
            </div>

            <div className="d-flex justify-content-center">
                <button type="button" onClick={ () => navigate(`/maintenance/v/${ _id }`) } className="p-2 btn rounded-circle btn-outline-primary m-2"><BsTools size={ 27 } /></button>
                <button type="button" onClick={ () => navigate(`/refuels/v/${ _id }`) } className="p-2 btn rounded-circle btn-outline-primary m-2"><RiGasStationFill size={ 30 } /></button>
                <button type="button" onClick={ () => navigate(`/vehicle/info/${ _id }`) } className="p-2 btn rounded-circle btn-outline-primary m-2"><IoDocumentTextOutline size={ 27 } /></button>
                {/* <button type="button" onClick={ () => setQrcode(true) } className="p-2 btn rounded-circle btn-outline-primary m-2"><RiShareForwardLine size={ 30 } /></button> */}
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