import React from 'react'
import { signOut } from "firebase/auth"
import { auth } from "../firebase-config"
import { NavLink } from 'react-router-dom'



export default function Submitted() {

    const logout = async () => {
        await signOut(auth)
        window.location = "/"
    }

    return (
        <div>
            <p>Your response has been recorded. Thank you.</p>
            <NavLink to="/form">Click here to log another bowel movement</NavLink>
            <br />
            <button onClick={logout}>Log out</button>
        </div>
    )
}
