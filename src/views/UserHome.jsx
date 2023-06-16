import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicle, useAuth } from "../hooks";
import { FiLogOut } from 'react-icons/fi';
import { firstLetterUppercase, getStorageValue, setStorageValue, translate } from "../common/utils";
// components
import Card from '../components/Card';

const UserHome = () => {
    const { signOut } = useAuth();
    let navigate = useNavigate();
    const { getVehiclesByUser } = useVehicle();
    const [cars, setCars] = useState(null);
    const [user,] = useState(getStorageValue('user'));

    const onGoHome = async () => {
        signOut();
        navigate('/');
    }

    const onAddVehicle = async () => {
        navigate('/vehicle/add');
    }

    const onGoVehicle = (car) => {
        setStorageValue('vehicle', car);
        navigate(`/vehicle/${ car._id }`);
    }

    const handleCars = () => {
        if (cars?.length <= 0) return <div className="d-flex justify-content-center p-3">{translate('users.home.nocars')} :(</div>

        return (
            cars.map(car => 
                <Card 
                    key={ car._id } 
                    title={ car.fullname } 
                    subtitle={ <div className="m-0 fw-bold card-subtitle" ><p className="m-0">{ car.plateNumber }</p></div>  }
                    onClick={ () => onGoVehicle(car) }
                    valueStyle={{ backgroundColor: "#c5c5c5", padding: "1rem 1rem" }} />)
        );
    }

    useEffect(() => {
        const getVehicles = async () => {
            try {
                const cars = await getVehiclesByUser();
                setCars(cars);
            } catch (e) {
                setCars([]);
            }
        }
        getVehicles();
    }, []);

    return (
        <div className="container-fluid main-container px-0">
            <div className="px-4 py-2">
                <p className="mb-2 mt-3">{ translate("users.home.subtitle") }, { user ? firstLetterUppercase(user.name) : 'user' }!</p>
                <h1 className="fw-bolder">{ translate("users.home.title") }</h1>
            </div>

            <div className="container-fluid d-flex justify-content-center pb-2">
                <button type="button" onClick={ onAddVehicle } className="btn btn-outline-primary rounded-pill m-2">{translate("users.home.button.add")}</button>
                <button type="button" onClick={ onGoHome } className="btn btn-primary rounded-pill m-2 d-flex align-items-center">
                    <FiLogOut className="me-1" size={20} /> {translate("users.home.button.signout")}
                </button>
            </div>

            <div className="container-fluid py-1 px-0">
                { cars === null
                    ? <div className="d-flex justify-content-center p-3"> Loading ...</div>
                    : handleCars()
                }
            </div>
        </div>
    );
}
 
export default UserHome;