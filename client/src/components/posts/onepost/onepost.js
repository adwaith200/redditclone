//React modules
import React from 'react';

//User defined modules
import './onepost.css';
import Votes from '../../votes/votes';
import Commentsymbol from '../../comments/commentsymbol/commentsymbol';

const onepost=props=>{
    // console.log(props.onepostdata);
    const date=new Date(props.onepostdata.date);
    const montharr=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
    const month=montharr[date.getMonth()];
    const day=date.getDate();
    return( 
        <div className='onepost'>
            <div className='onepost__user'>
                <div className='onepost__img'>
                    <img src={'images/userprofile/'+props.onepostdata.user.profilepic} className='onepost__pic'></img>
                </div>
                <div>
                    <h5>{props.onepostdata.user.name}</h5>
                </div>
                <div>
                    <span className='onepost__date'>{day} {month}</span>
                </div>
            </div>
            <div className='onepost__details'>
                <div className='onepost__title'>
                    <h4>{props.onepostdata.title}</h4>
                </div>
                <div className='onepost__postedimg'>
                    <img src={'images/postpics/'+props.onepostdata.postedpic} className='onepost__postedpic'></img>
                </div>
                <div className='onepost__description'>
                    <p>{props.onepostdata.description}</p>
                </div>
            </div>
            <div className='post__extra onepost__extra'>
                <div className='post__votes'>
                    <Votes upvotes={props.onepostdata.upvotes} postid={props.onepostdata.id}/>
                </div>    
                <div className='post__comments'>
                    <Commentsymbol para={props.onepostdata.comments.length}/>
                </div>
            </div>
        </div>
    )
}

export default onepost;