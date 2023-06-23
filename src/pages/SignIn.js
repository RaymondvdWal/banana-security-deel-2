import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from'react';
import {AuthContext} from "../context/AuthContext";
import InputField from "../components/InputField";
import {useForm} from "react-hook-form";
import axios from "axios";




function SignIn() {
    const {login, logout, auth} = useContext(AuthContext);
    const {register, formState: {errors}, handleSubmit} = useForm();


    function clickHandler() {
       if (auth.isAuth === true) {
           logout()
       }
    }

    async function submit(data, e) {
            try {
                const response = await axios.post("http://localhost:3000/login", {
                    email: data.email,
                    password: data.password,
                })
                console.log(response)
                console.log(response.data.accessToken)
                login(response.data.accessToken, "/profile")
                e.target[0].value = "";
                e.target[1].value = "";
            } catch (error) {
                console.error("Onjuist email of wachtwoord", error)
            }
        console.log(data)
    }

  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form onSubmit={handleSubmit(submit)}>
            <InputField
                id={"emailField"}
                register={register}
                name={"email"}
                validation={{required: true, message:"veld is verplicht" }}
                type={"email"}
                errors={errors}
            >Email:
            </InputField>

            <InputField
                id={"passwordField"}
                register={register}
                name={"password"}
                validation={{required: true, message:"veld is verplicht"}}
                type={"password"}
                errors={errors}
            >Password:
            </InputField>
            <button type="submit" onClick={clickHandler} >{auth.isAuth?"Uitloggen":"Inloggen"}</button>
        </form>

        {auth.isAuth?<p>Je bent ingelogd</p>:<p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>}
    </>
  );
}

export default SignIn;