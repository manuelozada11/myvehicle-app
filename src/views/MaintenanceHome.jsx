import { useEffect, useState } from "react";
import { BsCalendarX, BsCalendar2Check, BsCalendarMinus, 
    BsBatteryFull, BsBatteryHalf, BsBattery } from "react-icons/bs";
import { AiOutlineDollar } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import { useMaintenance } from "../hooks/useMaintenance";
import { dateFormat, translate } from "../common/utils";
import CarTitle from "../components/CarTitle";
import Spinner from "../components/Spinner";

const MaintenanceHome = () => {
    let navigate = useNavigate();
    const { _id } = useParams();
    const { getVehiclesInfoById } = useVehicle();
    const { getMaintenanceStats } = useMaintenance();
    const [car, setCar] = useState(null);
    const [stats, setStats] = useState(null);
    
    useEffect(() => {
        const getStats = async () => {
            try {
                const stat = await getMaintenanceStats({ _id });
                setStats(stat);
            } catch (e) {
                setStats({});
            }
        }
        !stats?.hasOwnProperty('quantity') && getStats();
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
                <CarTitle backTo={ `/vehicle/${ _id }` } />
            </div>

            <div className="row mx-0">
                { stats ?
                    <>
                    <div className="col-12 p-2">
                        <div className="card-stat h-100">
                            <div className="w-60 d-flex flex-row">
                                <h5 className="m-0 d-flex align-items-center fw-bold me-5">
                                    <BsCalendarX size={25} className="me-2" /> 
                                    {stats?.lastMaintenanceDate ? dateFormat(stats.lastMaintenanceDate).split(",")[0] : "-"}
                                </h5>
                                <h5 className="m-0 d-flex align-items-center fw-bold">
                                    <BsCalendar2Check size={25} className="me-2" /> 
                                    {stats?.nextMaintenanceDate ? dateFormat(stats.nextMaintenanceDate).split(",")[0] : "-"}
                                </h5>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 p-2">
                        <div className="card-stat-gray h-100">
                            <p className="m-0">{translate("vehicle.refuels.spent")}</p>
                            <div className="d-flex flex-row">
                                <AiOutlineDollar size={27} className="me-1" />
                                <h4 className="m-0 fw-bold d-flex align-items-center">
                                    { stats?.spentMonthly ? stats.spentMonthly : "0.00" }
                                </h4>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-6 p-2">
                        <div className="card-stat h-100" onClick={() => navigate(`/maintenance/add/general/${ _id }`)}>
                            <p className="m-0">{translate("vehicle.maintenance.home.quantity")}</p>
                            <h4 className="m-0 fw-bold">
                                { stats?.quantity ? stats.quantity : "0" }
                            </h4>
                        </div>
                    </div>

                    <div className="col-12 p-2">
                        <div className="card-stat-gray h-100">
                            <p className="m-0 fst-italic">Some fun fact about cars</p>
                        </div>
                    </div>

                    <div className="col-6 p-2">
                        <div className="card-stat h-100" onClick={ () => navigate(`/maintenance/add/battery/${ _id }`) }>
                            <div className="d-flex flex-row">
                                <BsBatteryFull size={24} className="me-2" />
                                <p className="m-0">{translate("vehicle.maintenance.home.battery")}</p>
                            </div>
                            <h5 className="m-0 fw-bold">
                                {stats?.batteryDate ? dateFormat(stats.batteryDate).split(",")[0] : "-"}
                            </h5>
                        </div>
                    </div>
                    
                    <div className="col-6 p-2">
                        <div className="card-stat-gray h-100" onClick={ () => navigate(`/maintenance/add/tires/${ _id }`) }>
                            <div className="d-flex flex-row">
                                <BsCalendarMinus size={22} className="me-2" />
                                <p className="m-0">{translate("vehicle.maintenance.home.tires")}</p>
                            </div>
                            <h5 className="m-0 fw-bold">
                                {stats?.tiresDate ? dateFormat(stats.tiresDate).split(",")[0] : "-"}
                            </h5>
                        </div>
                    </div>
                    </>
                    : 
                    <div className="d-flex justify-content-center align-items-center">
                        <Spinner size="md" />
                    </div>
                }
            </div>
        </div>
    );
}

export default MaintenanceHome;