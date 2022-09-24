import { getStorageValue } from "../common/utils";

export const useVehicle = () => {
    const getVehiclesByUser = async () => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/vehicles`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            }
        });
        
        if (response.status === 404) throw customError('No tienes vehiculos registrados', 404);

        const { payload } = await response.json();

        return payload;
    }
    
    const getVehiclesById = async ({ _id }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/vehicles/info/${ _id }`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            }
        });
        
        if (response.status === 404) throw customError('No se encontro ningun vehiculo', 404);

        const { payload } = await response.json();

        return payload;
    }

    return {
        getVehiclesByUser,
        getVehiclesById
    }
}