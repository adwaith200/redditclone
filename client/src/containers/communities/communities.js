//React modules
import React, { Component } from 'react';
import axios from '../../axiosbackend';
import {Link} from 'react-router-dom';

//User defined modules
import './communities.css';
import Communitiescomponent from '../../components/community/communities/communities';

class Communities extends Component{
    state={
        communities:[]
    }
    async componentDidMount()
    {
        try{
            const communitydata=await axios('/community');
            // console.log(communitydata.data.data);
            this.setState({
                communities:communitydata.data.data
            });
        }catch(err)
        {
            console.log(err.response);
        }
    }
    render()
    {
        return (
            <div>
                <h3>Communities</h3>
                <Link to='/createcommunity'><p>Create a new community</p></Link>
                <Communitiescomponent communities={this.state.communities}/>
            </div>
        );
    }
}

export default Communities;