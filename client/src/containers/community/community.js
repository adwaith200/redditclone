//React modules
import React, { Component } from 'react';
import axios from '../../axiosbackend';
import {connect} from 'react-redux';

//User defined modules
import './community.css';
import Spinner from '../../components/UI/spinner/spinner';
import Communityhead from '../../components/community/communityheader/communityhead';
import Posts from '../../components/posts/posts';
import Topornewpost from '../../components/posts/topornewpost';

class Community extends Component{
    state={
        community:{},
        joinedcommunity:false,
        members:0,
        loading:true
    }
    async componentDidMount(){
        this.setState({
            loading:true
        });
        try{
            const communitydata=await axios('/community/'+this.props.match.params.communityid+'?userid='+localStorage.getItem('userid'));
            this.setState({
                community:communitydata.data.data,
                joinedcommunity:communitydata.data.joinedcomm,
                members:communitydata.data.data.followers.length,
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

    followcommunity=async ()=>{
        if(this.props.token)
        {
            try{

                const stopfollowdata=await axios({
                    method:'PATCH',
                    url:'/user/followcommunity/'+this.props.match.params.communityid+'?auth='+this.props.token
                });
                this.setState((prevState)=>{
                    return{
                        joinedcommunity:true,
                        members:prevState.members+1
                    }
                });
                
            }catch(err)
            {
                console.log(err.response);
            }
        }
        else
        {
            this.props.history.push('/login');
        }
    }

    stopfollowingcommunity=async()=>{
        try{
            const stopfollowdata=await axios({
                method:'PATCH',
                url:'/user/unfollowcommunity/'+this.props.match.params.communityid+'?auth='+this.props.token
            });
            // this.setState({
            //     joinedcommunity:false
            // });
            this.setState((prevState)=>{
                return{
                    joinedcommunity:false,
                    members:prevState.members-1
                }
            });
        }catch(err)
        {
            console.log(err.response);
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
                        <p><span className='community__details__description__bold'>{this.state.members}</span> members</p>
                        <button className='community__details__button' onClick={this.state.joinedcommunity?this.stopfollowingcommunity:this.followcommunity}>{this.state.joinedcommunity?'Joined':'Follow'}</button>
                    </div>
                    <div className='community__posts'>
                        <Topornewpost newposturl={'/community/newpost/'+this.props.match.params.communityid} topposturl={'/community/toppost/'+this.props.match.params.communityid}/>
                    </div>
                </React.Fragment>}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        userid:state.auth.userid,
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Community);