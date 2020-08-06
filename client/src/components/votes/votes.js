//React modules
import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import axios from '../../axiosbackend';
import {connect} from 'react-redux';

//User defined modules
import './votes.css';


const votes=props=>{
    const [upvotestate,setUpvotestate]=useState(props.upvotes);
    const upvoteclasses=['upvotebtn'];
    const downvoteclasses=['downvotebtn'];
    const arrowup = <FontAwesomeIcon icon={faArrowUp} />
    const arrowdown=<FontAwesomeIcon icon={faArrowDown}/>
    
    useEffect(()=>{
        setUpvotestate(props.upvotes);
    },[]);
    
    const upvote=async()=>{
        try{
            const upvoted=await axios('/post/upvote/'+props.postid+'?auth='+props.token);
            if(upvoted.data.message=='Upvoted')
            {
                setUpvotestate(upvotestate+1);
            }
            
        }catch(err)
        {
            console.log(err.response);
        }
    }
    const downvote=async()=>{
        try{
            const downvoted=await axios('/post/downvote/'+props.postid+'?auth='+props.token);
            if(downvoted.data.message=='Downvoted')
            {
                setUpvotestate(upvotestate-1);
            }
        }catch(err)
        {
            console.log(err);
        }
    }

    return (
        <div className='votes'>
            <div className='upvotebtncontainer'>
                <button className={upvoteclasses.join(' ')} onClick={upvote}>{arrowup}</button>
            </div>
            <p className='votenumber'>{upvotestate}</p>
            <div className='downvotebtncontainer'>
                <button className={downvoteclasses.join(' ')} onClick={downvote}>{arrowdown}</button>
            </div>
        </div>
    );
}

const mapStateToProps=state=>{
    return {
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(votes);