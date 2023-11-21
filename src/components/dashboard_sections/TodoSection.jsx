import React from 'react'
import { Container, Task } from '../shared'
import { IconButton } from '@mui/material'
import { Add } from '@mui/icons-material'
import { useSelector } from 'react-redux'

// tid = null, target = "", type = "OTHERS", title = "", task = "", desc = "", priority = 5 
const TodoSection = ({ styleProp, showPortal }) => {
    const todos = useSelector(state => state.data.profile.todos)
    return (
        <Container {...{ styleProp }}>
            {
                todos.map((tid) => <Task tid={tid} key={tid} {...{ showPortal }} />)
            }
            {/* Add new todo */}
            <IconButton
                color='primary'
                size='large'
                onClick={() => showPortal(null, "TODO")}
            >
                <Add />
            </IconButton>
        </Container>
    )
}

export default TodoSection