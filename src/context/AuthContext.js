import {createContext, useState} from "react";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {

    const [isAuth, toggleIsAuth] = useState(false);
    console.log(isAuth)

   function login() {
        toggleIsAuth(isAuth =>true);
       console.log("login")
   }

   function logout() {
        toggleIsAuth(isAuth =>false);
       console.log("logout")
   }

   const data = {
       login: login,
       logout: logout,
       isAuth: isAuth
   }

    return(
       <AuthContext.Provider value={data}>
           {children}
       </AuthContext.Provider>
    )
}

export default AuthContextProvider;