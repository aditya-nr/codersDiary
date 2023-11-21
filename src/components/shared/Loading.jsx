import React from 'react'
import Container from './Container'

const Loading = ({ styleProp }) => {
    return (
        <Container {...{ styleProp }}>
            <div>Loading...</div>
        </Container>
    )
}

export default Loading
