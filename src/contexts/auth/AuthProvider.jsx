import { useState } from "react";
import { getStorageValue, setStorageValue, removeItemStorage, scrollToTop } from "../../common/utils";
import AuthContext from './';
import { customError } from '../../config/customError';

const AuthProvider = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false);
    const [user, setUser] = useState(getStorageValue('user'));

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
        setUser(user);

        return { code: 200, user }
    }

    const signOut = async () => {
        scrollToTop(0);
        setUser(null);
        removeItemStorage('user');
        removeItemStorage('token');
        removeItemStorage('vehicle');
    }
    
    return (
        <AuthContext.Provider value={{ 
            isOpenSidebar,
            setIsOpenSidebar,
            user,
            signIn,
            signOut 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;