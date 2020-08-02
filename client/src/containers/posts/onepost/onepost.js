//React modules
import React, { Component } from 'react';
import axios from '../../../axiosbackend';

//User defined modules
import './onepost.css';
import Spinner from '../../../components/UI/spinner/spinner';
import Onepostcomponent from '../../../components/posts/onepost/onepost';
import Communityhead from '../../../components/community/communityheader/communityhead';
import Commentsymbol from '../../../components/comments/commentsymbol/commentsymbol';
import Votes from '../../../components/votes/votes';
import Comments from '../../../components/comments/comments';

class Onepost extends Component{
    state={
        post:{},
        loading:true
    }
    async componentDidMount(){
        this.setState({
            loading:true
        })
        try{
            const postdata=await axios('/post/'+this.props.match.params.id);
            // console.log(postdata.data.data);
            this.setState({
                post:postdata.data.data,
                loading:false
            });
        }catch(err)
        {
            console.log(err);
            this.setState({
                loading:false
            });
        }
    }
    routetocommunity=()=>{
        this.props.history.push('/community/'+this.state.post.community._id);
        // console.log(this.props.history);
    }
    render()
    {
        return (
            <div className='onepostcontainer'>
                {this.state.loading?<Spinner/>:
                <React.Fragment>
                    <div onClick={this.routetocommunity}>
                        <Communityhead communitydata={this.state.post.community}/>
                    </div>
                    <Onepostcomponent onepostdata={this.state.post}/>
                    <Comments commentdata={this.state.post.comments} postid={this.state.post._id}/>
                </React.Fragment>}
            </div>
        )
    }
}

export default Onepost;