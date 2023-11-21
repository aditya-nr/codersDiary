import React from 'react'
import styles from './css.module.css';
const Container = ({ styleProp, children }) => {

    return (
        <div className={`${styles.container} ${styleProp}`}>
            {children}
        </div>
    )
}

export default Container