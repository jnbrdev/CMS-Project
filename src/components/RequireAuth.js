
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return(
        auth?.roles1?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            :auth?.email 
                ? <Navigate to="/login" replace/>
                :<Navigate to="/login" state={{ from: location}} replace/>

                
    )
}

export default RequireAuth