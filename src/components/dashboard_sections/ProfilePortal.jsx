import React from 'react'
import styles from './css.module.css';
import { Button } from '@mui/material';
import { BASE_URL } from '../../config';
import { useDispatch } from 'react-redux';
import { logout } from '../../context';
import { useNavigate } from 'react-router-dom';
const ProfilePortal = ({ close, token }) => {
    const { pp_wrapper, pp_container } = styles;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            let res = await fetch(`${BASE_URL}/logout`, {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify({ token }), // Convert data to JSON string
            });
            res = await res.json();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.log(`error :: \n`, error);
        }
    }

    return (
        <div
            className={pp_wrapper}
            onClick={close}
        >
            <div className={pp_container}>
                <Button
                    variant='text'
                    onClick={handleLogout}
                >Log out</Button>
            </div>
        </div>
    )
}

export default ProfilePortal