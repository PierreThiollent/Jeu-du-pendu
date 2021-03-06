import React from 'react'
import './Keyboard.css';

const Keyboard = ({letter, onClick, feedback}) => (
    <div style={{backgroundColor: `${feedback}`}} className={"letter"} onClick={() => onClick(letter)}>
        <span>
        {letter}
        </span>
    </div>
);

export default Keyboard
