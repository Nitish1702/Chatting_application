import React, { useState } from 'react'
import ChatContainer from './ChatContainer'
import styled from 'styled-components'
import Picker from 'emoji-picker-react'
import { IoMdSend } from 'react-icons/io'
import { BsEmojiSmileFill } from 'react-icons/bs'
import { sendMessageRoute } from '../utils/ApiRoutes'
import axios from 'axios'
import { io } from 'socket.io-client'

const ChatInput = ({handleMsgSend}) => {
  const [emojiPickerOn, setEmojiPickerOn] = useState(false)
  const [newMsg, setnewMsg] = useState(undefined)
    const handleEmojiClick = (e, emojiObject) => {
        setnewMsg((prevInput) => prevInput + e.emoji);
    }
    const handleEmojiShow = (e) => {

        setEmojiPickerOn(!emojiPickerOn)
    }
    
    
    return (
        <Container>
            <div className="emoji-button" >
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiShow} />
                    {emojiPickerOn && <Picker  onEmojiClick={handleEmojiClick} />}
                </div>
            </div>
            <div className="input-container" >
          <form onSubmit={(e) => {
            handleMsgSend(e, newMsg)
            setnewMsg('')
          }}>
                    <input value={newMsg} onChange={(e)=>setnewMsg(e.target.value)} />
                    <button type='submit' onClick={()=>setEmojiPickerOn(false)}>
                        <IoMdSend />
                    </button>
                </form>
            </div>


        </Container>
    )
  }
  const Container = styled.div`
  border-radius: 0rem 0rem 2rem 0rem;  
   display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .emoji-button{
    position: relative;
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
        position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .EmojiPickerReact {
        position: absolute;
        top: -490px;    
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .epr-categories {
          button {
            filter: contrast(0);
          }
        }
        .epr-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .epr-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
      padding: 0.7rem;
      form{

          width: 100%;
          border-radius: 2rem;
          display: flex;
          align-items: center;
          gap: 2rem;
          background-color: #ffffff34;
    }
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }

`
export default ChatInput