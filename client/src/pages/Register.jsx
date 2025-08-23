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


  const registerVoter = async (e) =>{
    e.preventDefault();
    
    // Client-side validation for email domain
    if(!userData.email.toLowerCase().endsWith('@srmap.edu.in')){
      setError('Only @srmap.edu.in email addresses are allowed.')
      return
    }
    
    // Client-side validation for password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/
    if(!passwordRegex.test(userData.password)){
      setError('Password must contain at least one uppercase letter, one lowercase letter, and one special character.')
      return
    }
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/voters/register`,userData)
      navigate('/')
    } catch (err) {
      setError(err.response.data.message)
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
