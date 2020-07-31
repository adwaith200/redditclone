//React modules
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';

//User defined modules
import './commentsymbol.css';

const commentsymbol=props=>{
    const comment=<FontAwesomeIcon icon={faComments} />
    return (
        <div className='commentsymbol'>
            <div className='commentlogo'>
                {comment}
            </div>
            <p className='commentpara'>{props.para}</p>
        </div>
    )
}

export default commentsymbol;