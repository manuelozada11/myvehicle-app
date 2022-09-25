import { customError } from '../config/customError';

export const useUser = () => {
    const getUserById = async ({ _id }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/users/${_id}`, {
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${ getStorageValue('token') }`
            }
        });
        
        if (response.status === 404) throw customError('Usuario no encontrado', 404);

        const { payload } = await response.json();

        return payload;
    }

    return {
        getUserById
    }
}