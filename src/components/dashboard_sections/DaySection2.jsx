import React from 'react'
import { Container2 } from '../shared'

const DSA = () => {
    return (
        <div>DSA</div>
    )
}
const WORK = () => {
    return (
        <div>WORK</div>
    )
}
const PROJECT = () => {
    return (
        <div>PROJECT</div>
    )
}



const DaySection2 = ({ styleProp }) => {
    return (
        <div className={`${styleProp}`}>
            <Container2
                title={["DSA", "WORK", "PROJECT"]}
                element={[DSA, WORK, PROJECT]}
            />
        </div>
    )
}

export default DaySection2