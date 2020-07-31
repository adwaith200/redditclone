//React modules
import React, { Component } from 'react';

//User defined modules
import Posts from '../../../components/posts/posts';
import axios from '../../../axiosbackend';
import Spinner from '../../../components/UI/spinner/spinner';

class Allposts extends Component{
    state={
        posts:[],
        loading:true
    }
    async componentDidMount(){
        try{
            const allpostsdata=await axios('/post');
            // console.log(allpostsdata.data.data);
            this.setState({
                posts:allpostsdata.data.data,
                loading:false
            });
        }catch(err)
        {
            console.log(err);
        }
    }
    render()
    {
        return (
            <div>
                {this.state.loading?<Spinner/>:<Posts posts={this.state.posts}/>}
            </div>
        )
    }
}

export default Allposts;