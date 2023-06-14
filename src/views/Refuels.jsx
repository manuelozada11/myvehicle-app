import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMaintenance } from "../hooks";
import { translate } from "../common/utils";
import { IoAdd } from 'react-icons/io5';
import { BsCalendarCheck, BsClock } from 'react-icons/bs';

// components
import Card from '../components/Card';
import CarTitle from "../components/CarTitle";
import { dateFormat, orderBy, round } from "../common/utils";

const Refuels = () => {
    let navigate = useNavigate();
    const { _id } = useParams();
    const { getRefuelsByVehicle } = useMaintenance();
    const [refuels, setRefuels] = useState(null);

    const onAddRefuel = async () => {
        navigate('/refuels/add');
    }

    const handleRefuels = () => {
        if (refuels?.length <= 0) return <div className="d-flex justify-content-center p-3">{translate("vehicle.refuels.norefuel")}</div>
        
        return (
            refuels.map(refuel => {
                const date = dateFormat(new Date(refuel.date)).split(', ')[0];
                const time = dateFormat(new Date(refuel.date)).split(', ')[1];
                const subtitle = <div className="m-0 fw-bold card-subtitle mt-1" style={{ fontSize: "0.8rem" }} >
                    <p className="mx-0 mt-0 mb-1 d-flex align-items-center"><BsCalendarCheck size={ 16 } className="me-2" /> { date }</p>
                    <p className="m-0 d-flex align-items-center"><BsClock size={ 16 } className="me-2" /> { time }</p>
                </div>;

                return (
                    <Card 
                        key={ refuel._id } 
                        title={ `${ refuel.quantity } lts` }
                        subtitle={ subtitle }
                        value={ `$ ${ refuel.amount }` }
                        valueStyle={{ fontSize: "1.2rem", color: "#dc3545" }} />
                );
            })
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
        <div className="container-fluid main-container px-0">
            <div className="px-4 pt-4 pb-3 row mx-0">
                <CarTitle backTo={`/vehicle/${ _id }`} />
            </div>

            <div className="d-flex justify-content-center pb-3">
                <button type="button" onClick={ onAddRefuel } className="p-1 btn btn-outline-primary rounded-circle">
                    <IoAdd size={ 30 } />
                </button>
            </div>

            <div className="row mx-0 px-2">
                <div className="col-6 p-2">
                    <div className="card-stat h-100">
                        <p className="m-0">{translate("vehicle.refuels.refuelsQty")}</p>
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
                        <p className="m-0">{translate("vehicle.refuels.spent")}</p>
                        <h4 className="m-0 fw-bold">
                        { refuels === null
                            ? <div className="d-flex justify-content-center p-3">Loading ...</div>
                            : `$ ${ handleRefuelStats(1) }`
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