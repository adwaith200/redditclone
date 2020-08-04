//React modules
import React from 'react';

//User defined modules
import './community.css';

const community=props=>{
    return (
        <div className='showcommunity'>
            <div className='showcommunity__nameandpic'>
                <div className='showcommunity__img'>
                    <img src={'/images/communitypics/'+props.community.communitypic} className='showcommunity__pic'></img>
                </div>
                <div className='showcommunity__name'>
                    <p>{props.community.name}</p>
                </div>
            </div>
            <div className='showcommunity__details'>
                <p>{props.community.description}</p>
            </div>
        </div>
    )
}

export default community;