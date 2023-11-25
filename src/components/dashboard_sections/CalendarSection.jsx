import React, { useState } from 'react'
import styles from './css.module.css';
import { Container } from '../shared'
import { useSelector } from 'react-redux'
import Cal from './Cal';
import { useCurrentDayIndex } from '../../hooks';



const CalendarSection = ({ styleProp }) => {
    const state = useSelector(state => state.data);
    const [days, setDays] = useState(Array.from({ length: state.profile.months * 30 }, () => true));
    const currentDayIndex = useCurrentDayIndex(state.profile.startDate);

    return (
        <Container styleProp={`${styleProp} ${styles.calendar_wrapper}`}>
            {
                days.map((val, index) => <Cal
                    key={index}
                    day={index + 1}
                    currentDayIndex={currentDayIndex}
                />)
            }
        </Container>
    )
}

export default CalendarSection