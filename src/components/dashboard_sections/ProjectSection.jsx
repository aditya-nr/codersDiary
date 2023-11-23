import React from 'react'
import { Container } from '../shared'
import { Typography } from '@mui/material'
import styles from './css.module.css';

const ProjectSection = ({ styleProp }) => {
    return (
        <Container {...{ styleProp }}>
            <Typography variant='h6'>PROJECT</Typography>
            <div className={styles.pro_container}>
                <Typography variant='h5'>Under Construction</Typography>
            </div>
        </Container>
    )
}

export default ProjectSection