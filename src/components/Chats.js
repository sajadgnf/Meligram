import React, { useContext, useEffect, useState } from 'react';
import { auth } from "../firebase"
import { useHistory } from "react-router-dom"
import { ChatEngine } from "react-chat-engine"
import axios from 'axios';

// components
import Navbar from './Navbar';

// styles
import styles from "./Chats.module.css"

// context
import { AuthContext } from "../contexts/AuthContextProvider"

// loader
import loader from '../assets/loader.svg'

const Chats = () => {

    const [loading, setLoading] = useState(true)
    const user = useContext(AuthContext)
    const history = useHistory()

    useEffect(() => {
        if (!user) {
            history.push('/')
            return
        }

        axios.get("https://api.chatengine.io/users/me", {
            headers: {
                "project-id": "c33c1075-3b3c-461c-8925-e313a6f03938",
                "user-name": user.email,
                "user-secret": user.uid,
            }
        })
            .then(() => {
                setLoading(false)
            })
            .catch(() => {
                let formdata = new FormData()
                formdata.append("email", user.email)
                formdata.append("username", user.email)
                formdata.append("secret", user.uid)
                getFile(user.photoURL)
                    .then(avatar => {
                        formdata.append("avatar", avatar, avatar.name)
                        axios.post("https://api.chatengine.io/users/", formdata, {
                            headers: {
                                "private-key": "05611ba3-49fc-4097-96d4-81a8ed3a14a9"
                            }
                        })
                            .then(() => setLoading(false))
                            .catch(error => console.log(error))
                    })
            })

    }, [user, history])

    const getFile = async (url) => {
        const response = await fetch(url)
        const data = await response.blob()
        return new File([data], "userPhoto.jpg", { type: "image/jpeg" })
    }

    const logoutHandler = async () => {
        await auth.signOut()
        history.push('/')
    }

    if (!user || loading) return <img src={loader} alt="Loading..." />

    return (
        <div className={styles.container}>
            <Navbar logoutHandler={logoutHandler} />

            <ChatEngine
                height="calc(100vh - 50px)"
                projectID='c33c1075-3b3c-461c-8925-e313a6f03938'
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;