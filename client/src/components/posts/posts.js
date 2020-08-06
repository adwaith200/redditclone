//React modules
import React,{useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';

//User defined modules
import Post from './post/post';
import './posts.css';

const posts=props=>{
    const divref=useRef();
    const limit=7;
    const [page,setPage]=useState(0);
    useEffect(()=>{
        setPage(0);
    },[]);
    const postsarr=props.posts.slice(page,page+7);
    const scrollToTop= () => {
        divref.current.scrollIntoView({ behavior: "smooth" })
      }
    const nextpage=()=>{
        if(page+limit<props.posts.length)
        {
            setPage(page+7);
            scrollToTop();
        }
    }
    const prevpage=()=>{
        if(page+limit>=0)
        {
            setPage(page-7);
            scrollToTop();
        }
    }
    return (
        <div className='posts' ref={divref}>
            {postsarr.map((post)=>{
                return <Link to={'/'+post._id} key={post._id}><Post post={post} key={post._id}/></Link>
            })}
            <div className='postbuttons'>
                {page===0?null:<button className='prevbtn' onClick={prevpage}>Previous</button>}
                {page+limit>=props.posts.length?null:<button className='nextbtn' onClick={nextpage}>Next</button>}
            </div>
        </div>
    )
}

export default posts;