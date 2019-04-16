import React from 'react';
import './style.css';

function Button(props) {
    return (
        <div>
            <button className={props.class} style={props.style} onClick={props.onClick}>
            {props.text}
            </button>
        </div>
    )
}

export default Button;
