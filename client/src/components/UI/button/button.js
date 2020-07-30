//React modules
import React from 'react';

//User defined modules
import './button.css';

const button=props=>{
    return (
        <button className='button' onClick={(e)=>props.submit(e)}>{props.type}</button>
    )
}

export default button;