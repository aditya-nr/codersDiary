import React, { useEffect, useState } from 'react'
import { WORK, QUESTION, TODO_OUTLINE, DSA_OUTLINE, DONE_BTN, PROJECT, DSA, THEORY } from '../../constant';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import styles from './css.module.css';

const Task = ({ tid, showPortal }) => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const user = useSelector(state => state.data.user)

    const clickHandler = () => {
        let { target, type, title, task, desc, priority } = data;
        showPortal(tid, target, type, title, task, desc, priority, setData);
    }

    const fetchTask = async (tid) => {
        let data = {
            token: user.token
        }
        try {
            let res = await fetch(`http://localhost:3000/api/task/${tid}`, {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify(data), // Convert data to JSON string
            });
            res = await res.json();

            console.log(res);
            if (!res.success) {
                return;
            }
            setData(res.task);
            setLoading(false);
        } catch (error) {
            console.log(`error :: \n`, error);
        }
    }
    useEffect(() => {
        fetchTask(tid);
    }, [])



    if (loading)
        return (
            <div>
                Loading...
            </div>
        )
    return (
        <div
            className={styles.task}
            onClick={clickHandler}
        >
            <Typography variant='subtitle1'>{data.title}</Typography>
            <Typography variant='body2'>{data.task}</Typography>
        </div>
    )
}

export default Task