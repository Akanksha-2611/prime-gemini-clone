import React, { useState } from 'react'
import '../App.css'
import Axios from "axios"
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    // Axios.post("http://localhost:3000/auth/login", {
    Axios.post("https://prime-gemini-clone-backend.vercel.app/auth/login",{
      email, password,
    })
      .then(response => {
        if (response.data.status) {
          navigate('/')
        }

        // alert("Successfully submitted");
      })
      .catch(err => {
        console.error("Error:", err);
        // alert("Submission failed. Please check the console for details.");
      });
  };

  return (
    <div className='sign-up-container'>

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor='email'>Email:</label>
        <input type='email' autoComplete='off' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor='password'>Password:</label>
        <input type='password' placeholder='******' onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>login</button>
        <Link to="/forgotPassword">Forgot Password?</Link>
        <p>Don't have Account? <Link to="/signup">Signup</Link></p>

      </form>

    </div>
  )
}

export default Login

