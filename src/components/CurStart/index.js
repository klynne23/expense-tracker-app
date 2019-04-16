import React from 'react';
import './style.css';

function CurStart(props) {

    return (
        <p className='currentStartAmt'>
            ${props.currentStart}
        </p>
    )
}

export default CurStart;
