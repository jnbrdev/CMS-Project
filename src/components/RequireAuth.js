
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return(
        auth?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : <Navigate to="/login"/>
                
    )
}

export default RequireAuth