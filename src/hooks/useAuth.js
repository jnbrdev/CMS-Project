import { useContext } from "react";
import AuthContext from "src/authentication/authProvider";

const useAuth = () => {
    return useContext(AuthContext)
}

export default useAuth