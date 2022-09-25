import { useContext } from 'react';
import AuthContext from '../contexts/auth';

export const useAuth = () => {
    const {
        isOpenSidebar,
        setIsOpenSidebar,
        user,
        signIn,
        signOut 
    } = useContext(AuthContext);

    return {
        isOpenSidebar,
        setIsOpenSidebar,
        user,
        signIn,
        signOut 
    }
}