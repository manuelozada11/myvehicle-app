import { getStorageValue } from "../common/utils";

export const useVehicle = () => {
    const createVehicle = async (data) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/vehicles`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            },
            body: JSON.stringify(data)
        });
        
        if (response.status === 404) throw customError('Error buscando el usuario', 404);
        if (response.status === 500) throw customError('Error en el servidor', 500);
    }

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
        const response = await fetch(`${ getStorageValue('apiDomain') }/vehicles/details/${ _id }`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            }
        });
        
        if (response.status === 404) throw customError('No se encontro ningun vehiculo', 404);

        const { payload } = await response.json();

        return payload;
    }
    
    const getVehiclesInfoById = async ({ _id }) => {
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

    const deleteCarById = async ({ _id }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/vehicles/${ _id }`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            }
        });
        
        if (response.status === 404) throw customError('No se encontro ningun vehiculo', 404);
        if (response.status === 500) throw customError('Error en el servidor', 500);
    }

    const updateCarById = async ({ _id, ...data }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/vehicles/${ _id }`, {
            method: 'PATCH',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            },
            body: JSON.stringify(data)
        });
        
        if (response.status === 404) throw customError('No se encontro ningun vehiculo', 404);
        if (response.status === 500) throw customError('Error en el servidor', 500);
    }

    return {
        createVehicle,
        updateCarById,
        getVehiclesByUser,
        getVehiclesById,
        getVehiclesInfoById,
        deleteCarById
    }
}