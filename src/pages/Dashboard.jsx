import React, { useEffect, useLayoutEffect, useState } from 'react'
import styles from './css.module.css'
import { AddEditSection, CalendarSection, DaySection, ProfileSection, ProjectSection, TodoSection } from '../components/dashboard_sections'
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setDayIndex, setProfile } from '../context';
import { useCurrentDayIndex } from '../hooks';


const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    const [display, setDisplay] = useState(false);
    const hidePortal = () => setDisplay(false);
    const [dataToPortal, setDataToPortal] = useState({});
    const showPortal = (tid = null, target = "", type = "OTHERS", title = "", task = "", desc = "", priority = 5) => {
        setDataToPortal({ tid, target, type, title, task, desc, priority })
        setDisplay(true);
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const state = useSelector(state => state.data)

    const fetchProfile = async (user) => {
        let dataToSend = {
            token: user.token
        };
        try {
            let res = await fetch("http://localhost:3000/api/profile", {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify(dataToSend), // Convert data to JSON string
            });
            res = await res.json();
            if (!res.success) {
                return false;
            }
            console.log({ profile: res });
            dispatch(setProfile({ profile: res.profile }));
            const currentDayIndex = useCurrentDayIndex(res.profile.startDate);
            dispatch(setDayIndex(currentDayIndex));
            setLoading(false);
        } catch (error) {
            console.log(`error :: \n`, error);
        }
    }
    useEffect(() => {
        if (!state.isLoggedIn || !state.user.activated)
            navigate('/');
        fetchProfile(state.user);
    }, [])

    if (loading)
        return (<>
            Loading...
        </>)

    return (
        <>
            <div className={`${styles.wrapper} ${styles.grid_container}`}>
                <CalendarSection styleProp={styles.calenderSection} />
                <DaySection styleProp={styles.daySection} {...{ showPortal }} />
                <ProjectSection styleProp={styles.projectSection} {...{ showPortal }} />
                <TodoSection styleProp={styles.todoSection} {...{ showPortal }} />
                <ProfileSection styleProp={styles.profileSection} />
            </div>
            {
                display && createPortal(
                    <AddEditSection {...{ hidePortal }} {...dataToPortal} />
                    ,
                    document.getElementById('popup')
                )
            }
        </>
    )
}

export default Dashboard