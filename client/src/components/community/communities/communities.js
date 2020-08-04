//React modules
import React from 'react';
import { Link,withRouter } from 'react-router-dom';

//User defined modules
import './communities.css';
import Community from './community/community';

const communities=props=>{
    console.log(props.communities);
    return (
        <div className='showcommunties'>
            {props.communities.map(community=>{
                return  <Link key={community._id} to={'/community/'+community._id}><Community community={community}/></Link>
            })}
        </div>
    )
}

export default withRouter(communities);