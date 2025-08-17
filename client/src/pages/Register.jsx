import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [userData,setUserData]=useState({fullName: "",email: "",password: "",password2: ""})
  const [error,setError]=useState("")
  const navigate=useNavigate()

//function to change our controlled inputs
  const changeInputHandler = (e) =>{
    setUserData(prevState =>{
      return{...prevState,[e.target.name]:e.target.value}
    })
  }


  const registerVoter = async (e) => {
    e.preventDefault();
    console.log('Submitting registration with data:', userData);
    console.log('API URL from env:', process.env.REACT_APP_API_URL);
    
    // Check if the API URL is properly loaded from .env
    if (!process.env.REACT_APP_API_URL) {
      console.error('API URL is not defined in environment variables');
      setError('Configuration error. Please contact administrator.');
      return;
    }
    
    const requestUrl = `${process.env.REACT_APP_API_URL}/voters/register`;
    console.log('Full request URL:', requestUrl);
    
    try {
      // Add request headers for debugging
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      console.log('Sending request with config:', config);
      
      const response = await axios.post(requestUrl, userData, config);
      console.log('Registration response:', response);
      console.log('Registration successful:', response.data);
      alert('Registration successful! Please login.');
      navigate('/');
    } catch (err) {
      console.error('Registration error details:', {
        message: err.message,
        response: err.response,
        request: err.request
      });
      
      if (err.response) {
        // The server responded with a status code outside the 2xx range
        console.error('Server error response:', {
          data: err.response.data,
          status: err.response.status,
          headers: err.response.headers
        });
        setError(err.response.data?.message || `Server error: ${err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        console.error('No response received from server');
        setError('No response from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', err.message);
        setError('Error setting up request: ' + err.message);
      }
    }
  }

  return (
   <section className="register">
    <div className="container register__container">
      <h2>Sign Up</h2>
      <form onSubmit={registerVoter}>
        {error && <p className="form__error-message">{error}</p>}
        <input type="text" name='fullName' placeholder='Full Name' onChange={changeInputHandler} autoComplete='true' autoFocus />
        <input type="email" name='email' placeholder='Email Address' onChange={changeInputHandler} autoComplete='true'  />
        <input type="password" name='password' placeholder='Password' onChange={changeInputHandler} autoComplete='true'  />
        <input type="password" name='password2' placeholder='Confirm Password' onChange={changeInputHandler} autoComplete='true'  />
        <p>Already have an account?<Link to='/'>Sign in</Link></p>
        <button type="submit" className="btn primary">Register</button>


      </form>
    </div>
   </section>
  )
}

export default Register
