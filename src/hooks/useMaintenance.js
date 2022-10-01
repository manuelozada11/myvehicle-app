import { customError } from '../config/customError';
import { getStorageValue } from "../common/utils";

export const useMaintenance = () => {
    const getRefuelsByVehicle = async ({ _id }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/refuels/vehicle/${ _id }`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            }
        });
        if (response.status === 400) throw customError('Ocurrio un error', 400);
        if (response.status === 404) throw customError('No encontramos recargas', 404);
        if (response.status === 500) throw customError('Error en el servidor', 500);

        const { payload } = await response.json();

        return payload;
    }

    const createRefuel = async ({ _id, data }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/refuels/${ _id }`, {
            method: 'POST',
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            },
            body: JSON.stringify(data)
        });
        if (response.status === 400) throw customError('Ocurrio un error', 400);
        if (response.status === 500) throw customError('Error en el servidor', 500);

        const result = await response.json();

        return result;
    }

    return {
        getRefuelsByVehicle,
        createRefuel
    }
}