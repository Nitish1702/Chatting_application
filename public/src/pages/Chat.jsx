import React, { useEffect, useState,useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import axios from 'axios'
import { allUsersRoute, host } from '../utils/ApiRoutes'
import Contacts from '../components/Contacts'
import Welcome from '../components/Welcome'
import ChatContainer from '../components/ChatContainer'
import { io } from 'socket.io-client'
import Logout from '../components/Logout'

const Chat = () => {
  const navigate = useNavigate()
  const socket=useRef()
  const [contacts, setContacts] = useState([])
  const [currUser, setcurrUser] = useState(undefined)
  const [currChat, setCurrChat] = useState(undefined)
  useEffect(() => {
    console.log('hello');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.isAwatarImageSet === false) {
      navigate('/setAvatar')
    }
    else if (!(localStorage.getItem('currentUser'))) {
      console.log(localStorage.getItem('currentUser'));
      navigate('/login')
    } else {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      setcurrUser(user)
    }
  }, [])
  useEffect(() => {
    if (currUser) {
      socket.current = io(host)
      socket.current.emit('add-user',currUser._id)
    }
  },[currUser])
  useEffect(() => {
    if (currUser) {
      axios.get(`${allUsersRoute}/${currUser._id}`).then(
        (users) => {
          console.log(users);
          setContacts(users.data)
        }
        )
      }
      
    }, [currUser])
    
    
    
    return (
      
      <Container>
      <Logout />
      <div className="container">
        <Contacts contacts={contacts} currentUser={currUser} setCurrChat={setCurrChat}/>
        {currChat ?
          <ChatContainer currChat={currChat} currUser={currUser} socket={ socket} />:
          <Welcome />
        }
      </div>
    </Container>
  )
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #e3e3ec;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .container {
    
    border-radius: 2rem;
    height: 85vh;
    width: 95vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%; /* Corrected property name */
    
    @media (min-width: 720px) and (max-height: 1080px) {
      grid-template-columns: 35% 65%; /* Adjusted layout for specific screen size */
    }
  }
`;


export default Chat