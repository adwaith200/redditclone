//React modules
import React, { useEffect,useState } from 'react';
import axios from '../../axiosbackend';
import {connect} from 'react-redux';

//User defined modules
import './topornewpost.css';
import Posts from './posts';
import Spinner from '../UI/spinner/spinner';

const topornewpost=props=>{
    const [loading,setLoading]=useState(true);
    const [posts,setPosts]=useState([]);
    const [topclasses,setTopclasses]=useState(['top']);
    const [newclasses,setNewclasses]=useState(['new']);
    const token=localStorage.getItem('token');
    useEffect(()=>{
        const gettoppostdata=async()=>{
            console.log(localStorage.getItem('token'));
            try{
                const postdata=await axios(props.topposturl+'?auth='+token);
                setPosts(postdata.data.data);
                setLoading(false);
            }catch(err)
            {
                console.log(err.response);
                setLoading(false);
            }
        }
        gettoppostdata();
        setTopclasses(topclasses.concat('activeclass'));
    },[]);

    const selecttop=async()=>{
        setTopclasses(topclasses.concat('activeclass'));
        setNewclasses(['new']);
        try{
            setLoading(true);
            const postdata=await axios(props.topposturl+'?auth='+token);
            setPosts(postdata.data.data);
            setLoading(false);
        }catch(err)
        {
            console.log(err.response);
        }
    }

    const selectnew=async()=>{
        setNewclasses(newclasses.concat('activeclass'));
        setTopclasses(['top']);
        try{
            setLoading(true);
            const postdata=await axios(props.newposturl+'?auth='+token);
            setPosts(postdata.data.data);
            setLoading(false);
        }catch(err)
        {
            console.log(err.response);
        }
    }

    return (
        <div className='topornewposts'>
            <div className='topornew'>
                <h3 className={topclasses.join(' ')} onClick={selecttop}>Top Posts</h3>
                <h3 className={newclasses.join(' ')} onClick={selectnew}>New Posts</h3>
            </div>
            {loading?<Spinner/>:<Posts posts={posts}/>}
        </div>
    );
}

const mapStateToProps=state=>{
    return {
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(topornewpost);