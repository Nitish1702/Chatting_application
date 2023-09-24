import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../assets/NiChat-logos/NiChat-logos_transparent.png'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { registerRoute } from '../utils/ApiRoutes';

const Register = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('currentUser')) {
          navigate('/')
        }
      },[])
      
    const [values, setvalues] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword:'',
    })
    const handleSubmit = async(e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { password, confirmPassword, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username, email, password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            else {
                localStorage.setItem('currentUser',JSON.stringify(data.user))
                navigate('/setAvatar')
                
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
        const { password, confirmPassword, username, email } = values;
        if (username.length<3){
            toast.error('username should be of length more than 3 chars', toastOptions);
            return false;
        }
        else if (email === '') {
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
        console.log(e.target.name);
        setvalues({ ...values, [e.target.name]: e.target.value });

    }
    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={logo} alt='logo' />
                        <h1>Snappy</h1>
                    </div>
                    <input
                        type="text"
                        placeholder='Username'
                        name='username'
                        onChange={(e) => {
                            handleChange(e)
                        }} />
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
                    <input
                        type="password"
                        placeholder='Confirm Password'
                        name='confirmPassword'
                        onChange={(e) => {
                            handleChange(e)
                        }} />
                    <button type='submit'>Create User</button>
                    <span>already have an account? <Link to='/login'>Login</Link></span>

                </form>
            </FormContainer>
            <ToastContainer/>
        </>
    )
}
export const FormContainer = styled.div`
    height:100vh;
    width:100vw;
    display:flex;
    justify-content:center;
    gap:1rem;
    align-items:center;
    background-color:#64709f;
    .brand{
        display:flex;
        align-items:center;
        justify-content:center;
        gap:1rem;
        img{
            height :5rem;
        }
        h1{
            color:white;
            text-transform:uppercase;

        }
        

    }
    form{
        display:flex;
        gap:2rem;
        flex-direction:column;
        background-color:#1f0165;
        border-radius:2rem;
        padding:3rem 5rem;
        input{
            background-color:transparent;
            padding:1rem;
            border:0.1rem solid #4e03ff;
            border-radius:0.4rem;
            font-size:1rem;
            color:white;
            &:focus{
                border:0.1rem solid #997af0;
                outline:none;
            }
    
        }
        button{
            background-color:#997af0;
            color:white;
            padding:1rem 2rem;
            border:none;
            font-weight:bold;
            cursor:pointer;
            border-radius:0.4rem;
            font-size:1rem;
            text-transform:uppercase;
            transition:0.5s ease-in-out;
            &:hover{
                background-color:#4e0eff;
            }
        }
        span{
            color:white;
            text-transform:uppercase;
            a{
                color:#4e0eff;
                text-decoration:none;
                font-weight:bold;
            }
        }
    }
    
  @media (max-width: 768px) {
    form {
      padding: 2rem 3rem; /* Adjust padding for smaller screens */
    }
  }
  
  @media (max-width: 480px) {
    form {
      padding: 2rem; /* Further adjust padding for mobile screens */
    }
  }

`;

export default Register