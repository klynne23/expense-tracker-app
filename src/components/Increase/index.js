import React from 'react';
import './style.css';

function Increase(props) {
  let id = props.id;

  return (
    <li className="collection-item avatar">
      <i className="fas fa-comment-dollar circle green"></i>
      <p className="title">{props.desc}</p>
      <p className='expense' style={{fontSize:'2rem'}}>
        <span style={{ color: '#319e31' }}>
          ${props.amount}
        </span>
      </p>
        <p>{props.date}</p>
      <a href="#!" className="secondary-content"><i className="fas fa-edit fa-2x" onClick={() => props.edit(id)}></i><i className="fas fa-trash-alt fa-2x" onClick={() => props.delete(id)}></i></a>
    </li>
  )
}

export default Increase;