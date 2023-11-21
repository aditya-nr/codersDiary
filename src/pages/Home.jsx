import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { setProfile } from '../context';

const Home = () => {
    const data = useSelector(state => state.data);
    const navigate = useNavigate();


    useEffect(() => {
        if (data.isLoggedIn && data.user.activated) {
            navigate('/dashboard');
        } else if (data.isLoggedIn) {
            navigate('/activate');
        }
    }, [data]);
    return (
        <div>
            <Link to={'/login'}><Button variant='outlined'>Login</Button></Link>
            <Link to={'/register'}><Button variant='outlined'>Sign up</Button></Link>
        </div>
    )
}

export default Home