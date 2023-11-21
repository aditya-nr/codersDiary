import { Typography } from '@mui/material'
import styles from './css.module.css'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setDayIndex } from '../../context'

const Cal = ({ text }) => {
    const dispatch = useDispatch();
    const day = useSelector(state => state.data.dayIndex);
    const setDay = () => dispatch(setDayIndex(text - 1))
    return (
        <div className={`${styles.cal_wrapper} ${(day == text - 1) && styles.cal_mark}`}
            onClick={setDay}
        >
            <Typography>{text}</Typography>
        </div>
    )
}

export default Cal