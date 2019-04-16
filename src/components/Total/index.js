import React from 'react';
import './style.css';

function Total(props) {
    let shadow = '';

    if (Number(props.balance > 0)) {
        shadow='#319e31'
    }
    else if (Number(props.balance < 0)){
        shadow='red'
    }
    else {
        shadow='black'
    }

    return (
        <div>
            <div className='container center'>
                <p className='total' style={{color:`white`, textShadow: `0 0 20px ${shadow}`
}}>${props.balance}</p>
            </div>
        </div>
    )
}

export default Total;
