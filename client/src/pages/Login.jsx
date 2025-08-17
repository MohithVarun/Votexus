import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from "react-redux"
import { voteActions } from '../store/vote-slice'


const Login = () => {
  const [userData,setUserData]=useState({fullName: "",email: "",password: "",password2: ""})
  const [error,setError]=useState("")

  const dispatch=useDispatch()
  const navigate=useNavigate()
//function to change our controlled inputs
  const changeInputHandler = (e) =>{
    setUserData(prevState =>{
      return{...prevState,[e.target.name]:e.target.value}
    })
  }

  // Function to check server availability
  const checkServerAvailability = async () => {
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/health`);
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginVoter = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    
    if (!userData.email || !userData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!process.env.REACT_APP_API_URL) {
      setError("Configuration error. Please contact administrator.");
      return;
    }

    // Check server availability first
    const isServerAvailable = await checkServerAvailability();
    if (!isServerAvailable) {
      setError("Server is not responding. Please try again later.");
      return;
    }

    const requestUrl = `${process.env.REACT_APP_API_URL}/voters/login`;
    
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // 5 second timeout
      };
      
      const response = await axios.post(requestUrl, userData, config);
      const newVoter = response.data;
      
      localStorage.setItem("currentUser", JSON.stringify(newVoter));
      dispatch(voteActions.changeCurrentVoter(newVoter));
      navigate("/results");
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      } else if (err.response) {
        // Server responded with error
        const errorMessage = err.response.data?.message || err.response.data;
        setError(typeof errorMessage === 'string' ? errorMessage : 'Invalid credentials');
      } else if (err.request) {
        // No response received
        setError('Network error. Please check your connection and try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  }

  return (
   <section className="register">
    <div className="container register__container">
      <h2>Sign In</h2>
      <form onSubmit={loginVoter}>
        {error && <p className="form__error-message">{error}</p>}
        <input type="email" name='email' placeholder='Email Address' onChange={changeInputHandler} autoComplete='true' autoFocus />
        <input type="password" name='password' placeholder='Password' onChange={changeInputHandler} autoComplete='true'  />
        <p>Don't have an account?<Link to='/register'>Sign Up</Link></p>
        <button type="submit" className="btn primary">Login</button>


      </form>
    </div>
   </section>
  )
}

export default Login

