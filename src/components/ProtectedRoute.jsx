import {useContext} from 'react';
import {Navigate, Outlet} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const ProtectedRoute = () => {
    const { user } = useContext(AuthContext);

    if (!user){
        return <Navigate to='/registering-page' replace/>
    }


    return <Outlet />
}


export default ProtectedRoute;