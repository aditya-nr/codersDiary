import React, { useState } from 'react'
import styles from './css.module.css';

const ELement = ({ element, index }) => {
    const Step = element[index];
    return <Step />
}

const Container2 = ({ title, element, className }) => {
    const { wrapper, tab_bar, tab, active_tab, content } = styles;
    const [index, setIndex] = useState(0);

    return (
        <div className={`${wrapper} ${className}`}>
            <div className={`${tab_bar}`}>
                {
                    title.map((t, i) => (
                        <div
                            className={`${tab} ${(i == index) && active_tab}`}
                            onClick={() => setIndex(i)}
                        >{t}</div>
                    ))
                }
            </div>
            <div className={`${content}`}>
                <ELement {...{ element, index }} />
            </div>
        </div>
    )
}

export default Container2