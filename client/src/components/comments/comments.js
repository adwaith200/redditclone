//React modules
import React,{useState,useRef} from 'react';
import {connect} from 'react-redux';
import axios from '../../axiosbackend';
import {withRouter} from 'react-router-dom';

//User defined modules
import './comments.css';
import Comment from './comment/comment';

const comments=props=>{
    const [commentinput,setCommentinput]=useState('');
    const commentref=useRef();
    const commentchangeHandler=()=>{
        setCommentinput(commentref.current.value);
    }
    
    const postcommentHandler=async ()=>{
        try{
            const postedcomment=await axios({
                method:'POST',
                url:'/comment?auth='+props.token,
                data:{
                    post:props.postid,
                    description:commentinput
                }
            });
            window.location.reload(true);
        }catch(err)
        {
            console.log(err.response);
        }
    }

    const redirecttologinpage=()=>{
        props.history.push('/login');
    }

    return ( 
        <div className='comments'>
            <div className='comments__heading'>
                <h5 className='comments__heading__details'>{props.commentdata.length} Comments</h5>
            </div>
            <div className='comment__inputcontainer'>
                {props.isauth?
                <React.Fragment>
                    <input ref={commentref} placeholder='Leave a comment' onChange={commentchangeHandler} className='comment__input'/>
                    <button className='comment__button' onClick={postcommentHandler}>Post comment</button>
                </React.Fragment>:<button className='loginsignupbtn' onClick={redirecttologinpage}>Login or Sign up to leave a comment</button>}
            </div>
            <div className='comment__comments'>
                {props.commentdata.map(comment=>{
                    return <Comment comment={comment} key={comment._id}/>
                })}
            </div> 
        </div>
    )
}

const mapStateToProps=state=>{
    return {
        isauth:state.auth.token!==null,
        token:state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(comments));