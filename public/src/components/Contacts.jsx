import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import logo from '../assets/NiChat-logos/NiChat-logos_transparent.png'

const Contacts = ({ contacts, currentUser, setCurrChat }) => {

    const [username, setUsername] = useState(undefined);
  const [currAvatarImage, setCurrAvatarImage] = useState(undefined);
  const [selectedContact, setSelectedContact] = useState(undefined)
  useEffect(() => {
    if (selectedContact>=0) {

      setCurrChat(contacts[selectedContact])
    }
  },[selectedContact])

    useEffect(() => {
        if (currentUser) {
            const { username, avatarImage } = currentUser;
            setCurrAvatarImage(avatarImage);
            setUsername(username);
        }
    }, [currentUser])
    
    return (
        <Container>
            <div className='brand'>
            <img src={logo} alt='logo' />
                <h2>NiChat</h2>
                </div>
            <div className="contacts">
                {
                    contacts.map((contact, index) => {
                        return (
                          <div className={`contact ${selectedContact === index ? "selected" : ""}`} key={index} onClick={() => {
                            setSelectedContact(index  )

                          }}>
                                <div className='avatar'>
                                    <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt={`contact${index}`} />
                                </div>
                                <div className="username">
                                    <h3>
                                       { contact.username}
                                    </h3>
                                </div>
                            </div>
                        )
                        
                    })
                }
            </div>
            < div className="currUser">
                <div className='avatar'>
                    <img src={`data:image/svg+xml;base64,${currAvatarImage}`} alt='avatar' />
                </div>
                <div className="username">
                    <h3>
                        { username}
                    </h3>
                </div>
                
            </div>
        </Container>
  )
}
const Container = styled.div`
display: grid;
border-radius: 2rem 0rem 0rem 2rem;
grid-template-rows: 10% 75% 15% ;
overflow: hidden;
background-color: #352783;//
gap:0.5rem;
color:white;
flex-direction:column;
.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  img {
    height: 4rem;
  }
  h2 {
    color: white;
    text-transform: uppercase;
  }
}
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  
  gap: 0.8rem;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      background-color: #ffffff39;
      width: 0.1rem;
      border-radius: 1rem;
    }
  }
  .contact {
    background-color: #ffffff34;
    min-height: 5rem;
    cursor: pointer;
    width: 90%;
    border-radius: 0.2rem;
    padding: 0.4rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    transition: 0.5s ease-in-out;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
      }
    }
  }
  .selected {
    background-color: #9a86f3;
  }
}

.currUser {
  background-color: #0d0d30;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  .avatar {
    img {
      height: 4rem;
      max-inline-size: 100%;
    }
  }
  .username {
    h2 {
      color: white;
    }
  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    gap: 0.5rem;
    .username {
      h2 {
        font-size: 1rem;
      }
    }
  }
}
`
export default Contacts