import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {BiPowerOff} from 'react-icons/bi'
import styled from 'styled-components'

const Logout = () => {
    const navigate=useNavigate()
    const handleClick = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <Button>
            <div onClick={()=>handleClick()}>Logout</div> 
    </Button>
  )
}
const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: end;
    padding:0.5rem;
    background-color: #b2a3f2;
    border-radius: 0.5rem;
    border: none;
    position: relative;
    left: 40%;
    cursor: pointer;
    div{
        font-size: 1.3rem;
        color: #ebe7ff;
    }
`
export default Logout