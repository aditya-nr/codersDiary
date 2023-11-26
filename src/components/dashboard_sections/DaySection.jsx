import React, { useEffect, useState } from 'react'
import { Container, Loading, Task } from '../shared'
import { useDispatch, useSelector } from 'react-redux'
import { setDay } from '../../context';
import { Button, Typography } from '@mui/material';
import { AddSharp, TodaySharp } from '@mui/icons-material';
import { BASE_URL } from '../../config';

const DaySection = ({ styleProp, showPortal }) => {
    const state = useSelector(state => state.data);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    const fetchDay = async (day) => {
        let dataToSend = {
            day,
            token: state.user.token
        };
        try {
            let res = await fetch(`${BASE_URL}/day`, {
                method: "POST", // Specify the method as POST
                headers: {
                    "Content-Type": "application/json", // Set the Content-Type header
                },
                body: JSON.stringify(dataToSend), // Convert data to JSON string
            });
            res = await res.json();
            console.log({ day: res });
            if (!res.success) {
                return false;
            }
            dispatch(setDay({ day: res.day }));
            setLoading(false);
        } catch (error) {
            console.log(`error :: \n`, error);
        }
    }
    useEffect(() => {
        fetchDay(state.dayIndex);
    }, [state.dayIndex])

    if (loading)
        return <Loading {...{ styleProp }} />

    return (
        <Container {...{ styleProp }}>
            <div> <TodaySharp />
                <Typography variant='subtitle2'>{state.dayIndex + 1}</Typography>
            </div>
            <div>
                <Typography variant='h6'>DSA</Typography>
                {
                    state.day.dsa.map((id) => <Task key={id} tid={id} {...{ showPortal }} />)
                }
                <Button
                    variant='outlined'
                    color='warning'
                    startIcon={<AddSharp />}
                    onClick={() => showPortal(null, "QUESTION", "DSA")}
                >
                    <Typography>DSA</Typography>
                </Button>
            </div>
            <div>
                <Typography variant='h6'>WORK</Typography>
                {
                    state.day.work.map((id) => <Task key={id} tid={id} {...{ showPortal }} />)
                }
                <Button
                    variant='outlined'
                    color='success'
                    startIcon={<AddSharp />}
                    onClick={() => showPortal(null, "WORK")}
                >
                    <Typography>WORK</Typography>
                </Button>
            </div>
        </Container>
    )
}

export default DaySection