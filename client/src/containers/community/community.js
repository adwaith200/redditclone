//React modules
import React, { Component } from 'react';
import axios from '../../axiosbackend';

//User defined modules
import './community.css';
import Spinner from '../../components/UI/spinner/spinner';
import Communityhead from '../../components/community/communityheader/communityhead';
import Posts from '../../components/posts/posts';

class Community extends Component{
    state={
        community:{},
        loading:true
    }
    async componentDidMount(){
        this.setState({
            loading:true
        });
        try{
            const communitydata=await axios('/community/5f23ac57794304079448023c');
            // console.log(communitydata.data.data);
            this.setState({
                community:communitydata.data.data,
                loading:false
            });
        }catch(err)
        {
            console.log(err);
            this.setState({
                loading:false
            })
        }
    }
    render()
    {
        return (
            <div className='community'>
                {this.state.loading?<Spinner/>:
                <React.Fragment>
                    <Communityhead communitydata={this.state.community}/>
                    <div className='community__details'>
                        <p className='community__details__description'>{this.state.community.description}</p>
                        <p><span className='community__details__description__bold'>{this.state.community.followers.length}</span> members</p>
                        <button className='community__details__button'>Joined</button>
                    </div>
                    <div className='community__posts'>
                        <h3>Posts</h3>
                        <Posts posts={this.state.community.posts}/>
                    </div>
                </React.Fragment>}
            </div>
        )
    }
}

export default Community;