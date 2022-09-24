import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";

const VehicleDetails = () => {
    let navigate = useNavigate();
    const { _id } = useParams();
    const { getVehiclesById } = useVehicle(null);
    const [car, setCar] = useState(null);
    
    const onGoBack = () => {
        navigate('/user');
    }

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
            <div className="px-4 pt-4 pb-3">
                { car === null
                    ? <h1 className="m-0 fw-bold">Loading ...</h1>
                    : <>
                        <h1 className="m-0 fw-bold">
                            { (car?.hasOwnProperty('manufacture') ? `${ car.manufacture } ${ car.model }` : '') }
                        </h1>
                        <p className="m-0">
                            { (car?.hasOwnProperty('plateNumber') ? `${ car.plateNumber }` : '') }
                        </p>
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

            <div className="mt-4 pt-2 d-flex flex-column">
                <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Recargas de combustible</button>
                <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Ficha del vehiculo</button>
                <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Mantenimientos</button>
                <button type="button" className="btn btn-block rounded-pill btn-outline-primary mx-3 my-2">Estadisticas</button>
                <button type="button" onClick={ onGoBack } className="btn btn-block rounded-pill btn-primary mx-3 my-2">Back</button>
            </div>
        </div>
    );
}

export default VehicleDetails;