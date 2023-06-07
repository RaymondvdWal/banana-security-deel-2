import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext";

function Profile() {
    const {isAuth} = useContext(AuthContext);

  return (
    <>
        {isAuth===true?
            <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> hardcoded-test</p>
        <p><strong>Email:</strong> hardcoded@test.com</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
            </>     :
      <p>Voor deze pagina moet je ingelogd zijn, hier kan je terug naar de homepagina --> <Link to="/">Homepagina</Link> </p>
            }
    </>
  );
}

export default Profile;