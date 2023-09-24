import React from 'react'
import styled from 'styled-components'
import robot from '../assets/robot.gif'
const Welcome = () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  return (
      <Container>
          <div className="welcome-logo">
              <img src={robot} alt='robot'>
              </img>
              <div className="welcome-text">
                  <h1>Welcome <span>{currentUser.username }!</span></h1>
                  <h3>Please select a chat to Start Messaging</h3>
              </div>
          </div>
    </Container>
  )
}
const Container=styled.div`
    display: flex;
    /* position: relative; */
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    gap:1rem;
    margin:0px 50px;
    img{
        width: 50%;
    }
    span{
        color: #0909e7;
    }
`
export default Welcome