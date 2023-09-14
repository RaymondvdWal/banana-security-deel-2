import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import {checkTokenValidity} from "../helper/checkTokenValidity";


export const AuthContext = createContext(null);

function AuthContextProvider({children}) {

    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: "pending",
    });
    const navigate = useNavigate();
    console.log(auth)

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken && checkTokenValidity(storedToken)) {
            void login(storedToken)
        } else {
            toggleAuth({
                ...auth,
                isAuth: false,
                user: null,
                status: "done"
            })
        }
    }, []);

   async function login(jwt, redirect) {
           console.log(jwt)
           localStorage.setItem("token", jwt);
           try {
               const decodedToken = jwt_decode(jwt);
               const {data: {email, id, username}} = await axios.get(`http://localhost:3000/600/users/${decodedToken.sub}`,
                   {headers:{
                       'Content-Type': 'application/json',
                       Authorization: `Bearer ${jwt}`
                       }}
                   )
               console.log(email,id,username)
               toggleAuth({
                   ...auth,
                   isAuth: true,
                   user: {
                        email,
                        id,
                        username
                   },
                   status: "done"
               });
               console.log(decodedToken)
               if (redirect) {
                   navigate('/profile')
               }
           } catch (error) {
               return alert("Token is invalid");
           }

        console.log("login")
   }

   function logout() {
        localStorage.clear()
        toggleAuth({
            ...auth,
            isAuth: false,
            user: null
        });
        navigate('/')
       console.log("logout")
   }

   const data = {
       login: login,
       logout: logout,
       auth: auth,
       user: auth.user
   }

    return(
       <AuthContext.Provider value={data}>
           {auth.status === "done" ? children : <p>Loading...</p>}
       </AuthContext.Provider>
    )
}

export default AuthContextProvider;