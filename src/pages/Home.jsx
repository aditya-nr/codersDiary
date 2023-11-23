import { Button, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { ArrowForwardIosSharp } from '@mui/icons-material';
import styles from './css.module.css';

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
        <div className={styles.h_wrapper}>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                {/* logo */}
                <div className={styles.h_logo}>
                    <Typography
                        variant='h4'
                    >CodersDiary</Typography>
                </div>
                <div>
                    <Typography>
                        App that track your progress. And make you consistent
                    </Typography>
                    {/* register */}
                    <Link to={'/register'}>
                        <Button
                            variant='outlined'
                            endIcon={<ArrowForwardIosSharp />}
                        >Start your journey</Button>
                    </Link>
                </div>
                {/* login */}
                <div style={{ display: 'flex', margin: '1rem' }}>
                    <Typography variant='body2'>Already have an account? </Typography>
                    <Link to={'/login'}>
                        <Typography variant='subtitle2' color='primary'>. Sign in</Typography>
                    </Link>
                </div>
            </div>

            <div className={styles.h_right}>
            </div>
        </div>

    )
}

export default Home