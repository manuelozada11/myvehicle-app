import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVehicle } from "../hooks/useVehicle";
// components
import Card from '../components/Card';
import { firstLetterUppercase, getStorageValue, scrollToTop, removeItemStorage } from "../common/utils";

const UserHome = () => {
    let navigate = useNavigate();
    const { getVehiclesByUser } = useVehicle();

    const [cars, setCars] = useState(null);
    const [user,] = useState(getStorageValue('user'));

    const onGoHome = async () => {
        scrollToTop(0);
        removeItemStorage('user');
        removeItemStorage('token');
        navigate('/');
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
        <div className="container-fluid px-0">
            <div className="px-4 py-2">
                <p className="mb-2 mt-3">Hola, { user ? firstLetterUppercase(user.name) : 'user' }!</p>
                <h1 className="fw-bolder">Tus carros</h1>
            </div>

            <div className="container-fluid d-flex justify-content-center pb-2">
                <button type="button" className="btn btn-outline-primary rounded-pill m-2">Agregar</button>
                <button type="button" onClick={ onGoHome } className="btn btn-primary rounded-pill m-2">Salir</button>
            </div>

            <div className="container-fluid py-1 px-0">
                { cars === null
                    ? <div className="d-flex justify-content-center p-3"> Loading ...</div>
                    : (
                        cars?.length > 0
                        ? cars.map(car => 
                            <Card 
                                key={ car._id } 
                                title={ car.fullname } 
                                subtitle={ car.plateNumber }
                                img={ `IMG` }
                                onClick={ () => navigate(`/vehicle/${ car._id }`) } />)
                        : <div className="d-flex justify-content-center p-3">No tienes vehiculos registrados :(</div>
                    )
                }
            </div>
        </div>
    );
}
 
export default UserHome;