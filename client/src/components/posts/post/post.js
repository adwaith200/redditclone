//React modules
import React from 'react';
import {withRouter} from 'react-router-dom';

//User defined modules
import './post.css';
import Votes from '../../votes/votes';
import Commentsymbol from '../../comments/commentsymbol/commentsymbol';

const post=props=>{
    const date=new Date(props.post.date);
    const montharr=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    const month=montharr[date.getMonth()];
    const day=date.getDate();
    
    const directtocommunity=()=>{
        props.history.push('/community/'+props.post.community._id);
    }

    return (
        <div className='post'>
            <div className='communtiy' onClick={directtocommunity}>
                <div className='communtiy__img'>
                    <img src={'/images/communitypics/'+props.post.community.communitypic} className='community__pic'></img>
                </div>
                <div className='community__name'>
                    <p>{props.post.community.name}</p>
                </div>
                <div className='posteddate'>
                    <p>{day} {month}</p>
                </div>
            </div>
            <div className='postdata'>
                <p className='post__para'>{props.post.title}</p>
                <div className='post__img'>
                    <img src={'/images/postpics/'+props.post.postedpic} className='post__pic'></img>
                </div>
            </div>
            <div className='post__extra'>
                <div className='post__votes'>
                    <Votes upvotes={props.post.upvotes} postid={props.post.id}/>
                </div>    
                <div className='post__comments'>
                    <Commentsymbol para='Comment'/>
                </div>
            </div>
        </div>
    )
}

export default withRouter(post);