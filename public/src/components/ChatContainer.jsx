import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Logout from './Logout'
import ChatInput from './ChatInput'
import Messages from './Messages'
import axios, { all } from 'axios'
import { getAllMessagesRoute,host, sendMessageRoute } from '../utils/ApiRoutes'
export const recieveMessageRoute = `${host}/api/messages/getmsg`;

const ChatContainer = ({ currChat, currUser, socket }) => {
  const [allMsgs, setAllMsgs] = useState([])
  const [arrivalMessage, setarrivalMessage] = useState(undefined)
  const [msg, setMsg] = useState('')
  const scroll = useRef()



  useEffect(() => {
    if (currChat) {
      console.log('hehe')
      axios.post(getAllMessagesRoute, {
        from: currUser._id,
        to: currChat._id
      }).then((res) => {
        console.log(res)
        setAllMsgs(res.data)
      })
    }
  }, [currChat])
  useEffect(() => {
    arrivalMessage && setAllMsgs((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  
  const handleMsgSend = async (e, message) => {
    e.preventDefault()
    console.log(message)
    if (socket.current) {
      socket.current.emit('send-msg', {
        to: currChat._id,
        msg: message
      })
      
    }
    await axios.post(sendMessageRoute, {
      from: currUser._id,
      to: currChat._id,
      msg: message
    })
    const updatedMsgs = [...allMsgs]
    updatedMsgs.push({ fromSelf: true, content: message })
    setAllMsgs(updatedMsgs)

    
  }
  useEffect(() => {

    socket.current.on('recv-msg', (msg) => {
      setarrivalMessage({ fromSelf: false, content: msg })
    })
    console.log(arrivalMessage)
  }, [allMsgs])
  useEffect(() => {
    scroll.current?.scrollIntoView({ behaviour: 'smooth' })
  })
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <img src={`data:image/svg+xml;base64,${currChat.avatarImage}`} alt='user avatar' />
          <div className="selectedUsername">
            <h3>{
              currChat.username
            }</h3>
          </div>
        </div>
        
      </div>
      <div className="chat-messages">
        <div className="messages">
          {allMsgs.length > 0 ?
            allMsgs.map((msg, index) => {
              return (
                <div key={index} className={`message ${msg.fromSelf ? 'sent' : 'receieved'}`}
                ref={scroll}>
                  <div className="content">
                    <p>{msg.content}</p>
                  </div>
                </div>
              )
            }) : <p>No Messages yet</p>
          }
        </div>
      </div>
      <div className="chat-input">
        <ChatInput handleMsgSend={handleMsgSend} setMsg={setMsg} />

      </div>

    </Container>
  )
}
const Container = styled.div`
  color:white;
  
  display: flex;
  flex-direction:column;
  justify-content: space-between;
  grid-template-columns: 15% 70% 15%;

  .chat-header{

    background-color: #26135c;
    display: flex;
    padding: 0.7rem 2rem;
    justify-content: space-between;
    align-items: center;
    .user-details{
      display: flex;
      align-items: center;
      gap:1rem;
      img{
        height: 3rem;
      }
      .currentUsername{
        h3{
          color:white;
        }
      }
    }

  }
  .chat-messages{

    max-height: 65vh;
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    height: 100vh;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #fffffff8;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .messages{
      gap: 1rem;
      display: flex;
      flex-direction: column;

      .content{
      width: fit-content;
      background-color: #139073;
      padding: 0.5rem 1rem;
      border-radius: 1rem;
      overflow: hidden;
      max-width: 85%;
      font-size: large;
      overflow-wrap: break-word;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
    }
    .sent{
      padding-left: 1rem;
      display: flex;

      justify-content: end;
      
      color:white;
    }
    .receieved{
      gap: 3rem;
      color:white;
    }
  }
  }
  .chat-input{
    
  }

`

export default ChatContainer