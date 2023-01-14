import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
import CarTitle from "../components/CarTitle";

const MaintenanceHome = () => {
    const { _id } = useParams();
    const { getVehiclesInfoById } = useVehicle();
    const [car, setCar] = useState(null);
    
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
                <CarTitle backTo={ `/vehicle/${ _id }` } />
            </div>
        </div>
    );
}

export default MaintenanceHome;