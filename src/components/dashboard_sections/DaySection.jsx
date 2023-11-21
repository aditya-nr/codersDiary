import React, { useEffect, useState } from 'react'
import { Container, Loading } from '../shared'
import { useDispatch, useSelector } from 'react-redux'
import { setDay } from '../../context';

const DaySection = ({ styleProp }) => {
    const state = useSelector(state => state.data);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchDay = async (day) => {
        let dataToSend = {
            day,
            token: state.user.token
        };
        try {
            let res = await fetch("http://localhost:3000/api/day", {
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
            Day :{state.dayIndex + 1}
        </Container>
    )
}

export default DaySection