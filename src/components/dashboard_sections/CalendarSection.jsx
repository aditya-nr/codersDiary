import React, { useState } from 'react'
import styles from './css.module.css';
import { Container } from '../shared'
import { useSelector } from 'react-redux'
import Cal from './Cal';



const CalendarSection = ({ styleProp }) => {
    const state = useSelector(state => state.data);
    const [days, setDays] = useState(Array.from({ length: state.profile.months * 30 }, () => true));


    return (
        <Container styleProp={`${styleProp} ${styles.calendar_wrapper}`}>
            {
                days.map((val, index) => <Cal
                    key={index}
                    text={index + 1}
                />)
            }
        </Container>
    )
}

export default CalendarSection