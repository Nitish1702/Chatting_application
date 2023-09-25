import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/NiChat-logos/NiChat-logos_transparent.png'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { loginRoute} from '../utils/ApiRoutes';
import { FormContainer } from './Register';

const Login = () => {
  const navigate=useNavigate()
  useEffect(() => {
    if (localStorage.getItem('currentUser')) {
      navigate('/')
    }
  },[])
  const [values, setvalues] = useState({
    email: '',
    password: '',
})
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      
      const { email, password } = values;
      
        const { data } = await axios.post(loginRoute, values);
        if (data.status === false) {
          toast.error(data.msg, toastOptions);

        }
        else {
          localStorage.setItem('currentUser', JSON.stringify(data.user))

          navigate('/')
          
        }
    }
  }
  
const toastOptions = {
    position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
    
}
const handleValidation = () => {
    const { password,email } = values;

    if (email === '') {
        toast.error('Email is required', toastOptions);
        return false;
        
    }
    // else if (password.length<8){
    //     toast.error('Password should be of length more than 8 chars', toastOptions);
    //     return false;
        
    // }
    // else if (password != confirmPassword) {
    //     toast.error('password should be same as confirm password', toastOptions);
    //     return false;
    // }
    return true;
    
}
const handleChange = (e) => {

  setvalues({ ...values, [e.target.name]: e.target.value });
  
}
return (
    // FormContainer()  
    <>
        <FormContainer>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="brand">
                    <img src={logo} alt='logo' />
                    <h1>Snappy</h1>
                </div>
                
                <input
                    type="email"
                    placeholder='Email'
                    name='email'
                    onChange={(e) => {
                        handleChange(e)
                    }} />
                <input
                    type="password"
                    placeholder='Password'
                    name='password'
                    onChange={(e) => {
                        handleChange(e)
                    }} />
                <button type='submit'>Login</button>
                <span>Don't have an account? <Link to='/register'>Register</Link></span>

            </form>
        </FormContainer>
        <ToastContainer/>
    </>
)
}

export default Login