//React modules
import React from 'react';

//User defined modules
import Post from './post/post';
import './posts.css';

const posts=props=>{
    return (
        <div className='posts'>
            {props.posts.map((post)=>{
                return <Post post={post} key={post._id}/>
            })}
            <div className='postbuttons'>
                <button className='prevbtn'>Previous</button>
                <button className='nextbtn'>Next</button>
            </div>
        </div>
    )
}

export default posts;