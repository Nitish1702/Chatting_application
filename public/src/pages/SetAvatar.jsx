import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import loader from '../assets/loader.gif'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { setAvatarRoute } from '../utils/ApiRoutes';
import { Buffer } from 'buffer'

const SetAvatar = () => {
    const api = `https://api.multiavatar.com/4645646`;
    const navigate = useNavigate();
    const [avatars, setAvatars] = useState([])
    const [isloading, setIsloading] = useState(false)
    const [selectedAvatar, setSelectedAvatar] = useState(undefined)
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
    useEffect(() => {
        const currUser=JSON.parse(localStorage.getItem('currentUser'))
        if (currUser&& currUser.isAwatarImageSet ===true) {
          navigate('/')
        }
      })
    const setProfilePicture = async (e) => {
        e.preventDefault()
        if (selectedAvatar === undefined) {
            toast.error("Select an avatar", toastOptions);
        }
        else {
            const user = JSON.parse(localStorage.getItem('currentUser'))
            const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
                image: avatars[selectedAvatar]
            })
            if (data.isSet) {
                user.isAwatarImageSet = true;
                user.avatarImage = data.image;
                localStorage.setItem('currentUser', JSON.stringify(user))

                navigate('/')
            } else {
                toast.error("Error setting Avatar. Try again", toastOptions);
                
            }
        }

    }
    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true);
            const data = [];
            for (let i = 0; i < 4; i++) {
                try {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
                    const theBuffer = Buffer.from(image.data);
                    data.push(theBuffer.toString('base64'));
                } catch (error) {
                    console.error('Error fetching avatar:', error);
                }
            }
            setIsloading(false);
            setAvatars(data);
        };

        fetchData();
    }, []);

    return (
        <>
            {isloading ? (
                <Container>
                    <img src={loader} alt="loader" className="loader" />
                </Container>
            ) :
                <Container>

                    <div className='title-container'>
                        <h1> Pick an Avatar as your profile picture</h1>
                    </div>
                    <div className="avatars">
                        {
                            avatars.map((avatar, index) => {
                                return (
                                    <div key={index} className={`avatar ${selectedAvatar === index ? "selected" : ""}`}>
                                        <img src={`data:image/svg+xml;base64,${avatar}`} onClick={() => setSelectedAvatar(index)} alt="avatar" />
                                    </div>

                                )
                            })
                        }
                    </div>
                    <button onClick={(e)=>setProfilePicture(e)} className="submit-btn">
                        Set as Profile Picture
                    </button>
                </Container>
            }
            <ToastContainer />
        </>
    )
}
const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 3rem;
background-color: #131324;
height: 100vh;
width: 100vw;

.loader {
  max-inline-size: 100%;
}

.title-container {
  h1 {
    color: white;
  }
}
.avatars {
  display: flex;
  gap: 2rem;

  .avatar {
    border: 0.4rem solid transparent;
    padding: 0.4rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s ease-in-out;
    img {
      height: 6rem;
      transition: 2s ease-in-out;
    }
  }
  .selected {
    border: 0.4rem solid #4e0eff;
  }
}
.submit-btn {
  background-color: #4e0eff;
  color: white;
  padding: 1rem 2rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.4rem;
  font-size: 1rem;
  text-transform: uppercase;
  &:hover {
    background-color: #4e0eff;
  }
}
`
export default SetAvatar