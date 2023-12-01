import React, { useEffect, useState } from 'react'
import styles from './css.module.css';
import { svgCal, svgLeetcode, svgProfile } from '../../assets'
import { Container } from '../shared'
import { useSelector } from 'react-redux'
import { Button, Icon, IconButton, Typography } from '@mui/material'
import { AccountCircle } from '@mui/icons-material';
import ProfilePortal from './ProfilePortal';
import { createPortal } from 'react-dom';

const ProfileSection = ({ styleProp }) => {
    const { profile_wrapper, flex } = styles;
    const { dayIndex, profile: { months }, user: { token } } = useSelector(s => s.data);
    const [lc, setLeetcode] = useState(null);
    const [display, setDisplay] = useState(false);

    const fetchLc = async () => {
        try {
            let res = await fetch(`https://leetcode-stats-api.herokuapp.com/aditya-nr`);
            res = await res.json();
            let { easySolved, mediumSolved, hardSolved } = res
            setLeetcode({
                easy: easySolved,
                medium: mediumSolved,
                hard: hardSolved
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        fetchLc();
    }, [])


    return (
        <>
            <Container {...{ styleProp: `${styleProp} ${profile_wrapper}` }}>
                <div className={flex}>
                    <img src={svgCal} height={'50px'} />
                    <Typography>{dayIndex + 1}/{months * 30}</Typography>
                </div>
                <div className={flex}>
                    <img src={svgLeetcode} height={'50px'} />
                    {
                        lc &&
                        <Typography>{lc.easy}/{lc.medium}/{lc.hard}</Typography>
                    }
                </div>
                <div>
                    <Button
                        onClick={() => setDisplay(true)}
                    >
                        <img src={svgProfile} />
                    </Button>
                </div>
            </Container>
            {
                display && createPortal(
                    <ProfilePortal close={() => { setDisplay(false) }} token={token} />
                    ,
                    document.getElementById('popup')
                )
            }
        </>
    )
}

export default ProfileSection