import { getStorageValue, setStorageValue } from "../common/utils";
import { customError } from '../config/customError';

export const useAuth = () => {
    const signIn = async ({ username, password }) => {
        const response = await fetch(`${ getStorageValue('apiDomain') }/users/signin`, {
            headers: {
                "content-type": "application/json",
                authorization: `Basic ${ btoa(`${ username }:${ password }`) }`
            }
        });
        
        if (response.status === 404) throw customError('Usuario o contraseña inválida', 404);

        const {
            user,
            token
        } = await response.json();
        setStorageValue('user', user);
        setStorageValue('token', token);

        return { code: 200, user }
    }

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
        signIn,
        getUserById
    }
}