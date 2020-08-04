//React modules
import React from 'react';

//Userdefined modules
import './input.css';

const input=props=>{
    let input;
    if(props.type==='email')
    {
        input=<input type='email' placeholder='Enter your email' onChange={props.changed} className='input'/>
    }
    else if(props.type==='password')
    {
        input=<input type='password' placeholder='Enter your password' onChange={props.changed} className='input'/>
    }
    else if(props.type==='passwordconfirm')
    {
        input=<input type='password' placeholder='Confirm your password' onChange={props.changed} className='input'/>
    }
    else if(props.type==='textarea')
    {
        input=<textarea rows='4' className='input'  onChange={props.changed}  placeholder='Add your text...'></textarea>
    }
    else if(props.type==='select')
    {
        input=( <select className='input'>
                    <option>Cats</option>
                    <option>Dogs</option>
                </select>
                );
    }
    else if(props.type==='file')
    {
        input=<input type='file' onChange={props.changed} className='input'/>
    }
    else 
    {
        input=<input type='text' placeholder={props.data} onChange={props.changed} className='input'/>
    }
    return input;
}

export default input;