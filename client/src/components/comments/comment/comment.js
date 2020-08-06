//React modules
import React from 'react';

//User defined modules
import './comment.css';

const comment=props=>{
    const date=new Date(props.comment.date);
    const montharr=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    const month=montharr[date.getMonth()];
    const day=date.getDate();
    return (
        <div className='comment'>
            <div className='comment__header'>
                <div className='comment__img'>
                    <img src={'images/userprofile/'+props.comment.user.profilepic} className='comment__pic'></img>
                </div>
                <div className='comment__user'>
                    <h4 className='comment__user__heading'>{props.comment.user.name}</h4>
                </div>
                <div className='comment__date'>
                    <span>{day} {month}</span>
                </div>
            </div>
            <div className='comment__details'>
                <p className='comment__details__data'>{props.comment.description}</p>
            </div>
        </div>
    )
}

export default comment;