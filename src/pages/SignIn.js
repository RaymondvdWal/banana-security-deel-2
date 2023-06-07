import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from'react';
import {AuthContext} from "../context/AuthContext";



function SignIn() {
    const {login, logout, isAuth} = useContext(AuthContext);

    function clickHandler() {
        isAuth? logout(): login();
    }


  return (
    <>
      <h1>Inloggen</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>

        <form>
            <p>*invoervelden*</p>
            <button type="button" onClick={clickHandler} >{isAuth?"Uitloggen":"Inloggen"}</button>
        </form>

        {isAuth?<p>Je bent ingelogd</p>:<p>Heb je nog geen account? <Link to="/signup">Registreer</Link> je dan eerst.</p>}
    </>
  );
}

export default SignIn;