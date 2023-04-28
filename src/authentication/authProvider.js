import {createContext, useState, useEffect} from "react"
const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(() => {
        // try to get the auth data from local storage
        const authData = localStorage.getItem("auth");
        return authData ? JSON.parse(authData) : {};
      });
    
      useEffect(() => {
        // store the auth data in local storage whenever it changes
        localStorage.setItem("auth", JSON.stringify(auth));
      }, [auth]);

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;