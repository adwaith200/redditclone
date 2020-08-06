//React modules
import React from 'react';

//User defined modules
import './communityhead.css';
 
const communityhead=props=>{
    return (
        <div className='communityhead'>
            <div className='communityhead__img'>
                <img src={'/images/communitypics/'+props.communitydata.communitypic} className='communityhead__pic'></img>
            </div>
            <div className='communityhead__details'>
                <h3>{props.communitydata.name}</h3>
            </div>
        </div>
    )
}

export default communityhead;