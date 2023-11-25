import { Typography } from '@mui/material'
import styles from './css.module.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDayIndex } from '../../context'

const Cal = ({ day, currentDayIndex }) => {
    const dispatch = useDispatch();
    const dayIndex = useSelector(state => state.data.dayIndex);
    const setDay = () => dispatch(setDayIndex(day - 1))
    return (
        <div
            className={
                `${styles.cal_wrapper} 
                ${(dayIndex == day - 1) && styles.cal_mark}
                ${(currentDayIndex > (day - 1)) && styles.cal_done}
                ${(currentDayIndex == (day - 1)) && styles.cal_currentDay}`
            }
            onClick={currentDayIndex < (day - 1) || setDay}
        >
            <Typography>{day}</Typography>
        </div>
    )
}

export default Cal