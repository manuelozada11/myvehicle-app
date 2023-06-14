import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { GiCarWheel } from 'react-icons/gi';
import { translate } from "../common/utils";
import CustomQrCode from "../components/CustomQrCode";
import CarTitle from "../components/CarTitle";
import WhiteCard from "../components/WhiteCard";
import Spinner from "../components/Spinner";

const AddMaintenance = () => {
    const { type, _id } = useParams();
    const { getVehiclesInfoById } = useVehicle();
    const [car, setCar] = useState(null);
    const [refuels, setRefuels] = useState(null);
    const [component, setComponent] = useState({

    });
    
    const handleRefuelStats = (type) => {
        if (type) {
            let amount = 0;
            refuels.forEach(ref => amount += Number(ref.amount));
            return round(amount, 2);
        }

        return refuels.length;
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
        <div className="container-fluid main-container px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                <CarTitle backTo={ `/maintenance/v/${ _id }` } />
            </div>

            <WhiteCard 
                title={<>
                    <GiCarWheel className="me-2" size={ 25 } /> 
                    { translate(`vehicle.maintenance.home.${type}`) }
                </>}
                subtitle={ translate("vehicle.maintenance.add.section") }
            />
            
            <div className="row mx-0 px-2">
                <div className="col-6 p-2">
                    <div className="card-stat h-100">
                        <p className="m-0">{translate(`vehicle.maintenance.add.${ type }.stats1`)}</p>
                        <h4 className="m-0 fw-bold">
                        { refuels === null
                            ? <div className="d-flex justify-content-center p-3"><Spinner /></div>
                            : handleRefuelStats()
                        }
                        </h4>
                    </div>
                </div>

                <div className="col-6 p-2">
                    <div className="card-stat h-100">
                        <p className="m-0">{translate("vehicle.refuels.spent")}</p>
                        <h4 className="m-0 fw-bold">
                        { refuels === null
                            ? <div className="d-flex justify-content-center p-3"><Spinner /></div>
                            : `$ ${ handleRefuelStats(1) }`
                        }
                        </h4>
                    </div>
                </div>
            </div>

            <div className="row mx-0 px-3">
                <h6 className="fw-bold">Add new one</h6>
                <p className="m-0">Este es el historico de todas las veces que has cambiado la bateria de tu vehiculo</p>
            </div>

            
        </div>
    );
}

export default AddMaintenance;