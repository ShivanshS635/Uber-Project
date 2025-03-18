import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDataContext)

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        axios.get(`${process.env.VITE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data.user)
            }
        })
            .catch(err => {
                console.log(err)
                localStorage.removeItem('token')
                navigate('/login')
            })
    }, [ token ])

    return <>{children}</>;
};

export default UserProtectedWrapper;
