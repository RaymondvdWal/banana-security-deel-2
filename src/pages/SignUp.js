import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import InputField from "../components/InputField";
import {useForm} from "react-hook-form";
import axios from "axios";

function SignUp() {

    const {register, formState: {errors}, handleSubmit} = useForm();
    const navigate = useNavigate();
    async function submit(data) {
        try {
            const response = await axios.post("http://localhost:3000/register", {
                email: data.email,
                password: data.password,
                username: data.username
            })
            console.log(data)
            console.log(response.data)
            navigate('/login')
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <>
      <h1>Registreren</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur atque consectetur, dolore eaque eligendi
        harum, numquam, placeat quisquam repellat rerum suscipit ullam vitae. A ab ad assumenda, consequuntur deserunt
        doloremque ea eveniet facere fuga illum in numquam quia reiciendis rem sequi tenetur veniam?</p>
      <form onSubmit={handleSubmit(submit)}>

          <InputField
              id={"usernameField"}
              register={register}
              name={"username"}
              validation={{required: true}}
              type={"text"}
              errors={errors}
          >Username:
          </InputField>

          <InputField
          id={"emailField"}
          register={register}
          name={"email"}
          validation={{required: true }}
          type={"email"}
          errors={errors}
          >Email:
          </InputField>

          <InputField
          id={"passwordField"}
          register={register}
          name={"password"}
          validation={{required: true}}
          type={"password"}
          errors={errors}
          >Password:
          </InputField>
          <button type="submit">Verzenden</button>
      </form>
      <p>Heb je al een account? Je kunt je <Link to="/signin">hier</Link> inloggen.</p>
    </>
  );
}

export default SignUp;