import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMaintenance } from "../hooks";
import BackButton from "../components/BackButton";
import { getStorageValue } from "../common/utils";
import { IoAdd } from 'react-icons/io5';

// components
import Card from '../components/Card';
import { dateFormat, orderBy, round } from "../common/utils";

const Refuels = () => {
    let navigate = useNavigate();
    const { _id } = useParams();
    const { getRefuelsByVehicle } = useMaintenance();
    const [refuels, setRefuels] = useState(null);

    const onGoBack = async () => {
        navigate(`/vehicle/${ _id }`);
    }

    const onAddRefuel = async () => {
        navigate('/refuels/add');
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

    const handleRefuels = () => {
        if (refuels?.length <= 0) return <div className="d-flex justify-content-center p-3">No tienes recargas (Por ahora) (:</div>
        
        return (
            refuels.map(refuel => 
                <Card 
                    key={ refuel._id } 
                    title={ `${ refuel.quantity } lts` } 
                    subtitle={ dateFormat(new Date(refuel.date)) }
                    subtStyle={ { fontSize: "0.8rem" } }
                    img={ `$ ${ refuel.amount }` }
                    imgStyle={{ fontSize: "1.2rem", color: "#dc3545" }} />)
        );
    }
    
    const handleRefuelStats = (type) => {
        if (type) {
            let amount = 0;
            refuels.forEach(ref => amount += Number(ref.amount));
            return round(amount, 2);
        }

        return refuels.length;
    }

    useEffect(() => {        
        const getRefuels = async () => {
            try {
                const refuel = await getRefuelsByVehicle({ _id });
                setRefuels(orderBy(refuel, 'date'));
            } catch (e) {
                setRefuels([]);
            }
        }
        !refuels?.hasOwnProperty('_id') && getRefuels();
    }, []);

    return (
        <div className="container-fluid px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                { handleTitle() }
            </div>

            <div className="d-flex justify-content-center pb-3">
                <button type="button" onClick={ onAddRefuel } className="p-1 btn btn-outline-primary rounded-circle">
                    <IoAdd size={ 30 } />
                </button>
            </div>

            <div className="row mx-0 px-2">
                <div className="col-6 p-2">
                    <div className="card-stat h-100">
                        <p className="m-0">Cant. Recargas</p>
                        <h4 className="m-0 fw-bold">
                        { refuels === null
                            ? <div className="d-flex justify-content-center p-3">Loading ...</div>
                            : handleRefuelStats()
                        }
                        </h4>
                    </div>
                </div>

                <div className="col-6 p-2">
                    <div className="card-stat h-100">
                        <p className="m-0">Gasto total</p>
                        <h4 className="m-0 fw-bold">
                        { refuels === null
                            ? <div className="d-flex justify-content-center p-3">Loading ...</div>
                            : handleRefuelStats(1)
                        }
                        </h4>
                    </div>
                </div>
            </div>

            <div className="pb-1 px-0">
                { refuels === null
                    ? <div className="d-flex justify-content-center p-3">Loading ...</div>
                    : handleRefuels()
                }
            </div>
        </div>
    );
}
 
export default Refuels;