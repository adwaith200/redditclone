//React modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from '../../axiosbackend';

//User defined modules
import './account.css';
import Spinner from '../../components/UI/spinner/spinner';
import Posts from '../../components/posts/posts';
import Comment from '../../components/comments/comment/comment';

class Account extends Component{
    state={
        user:{},
        data:[],
        posts:[],
        comments:[],
        loading:true,
        postclass:['account__postlink'],
        commentclass:['account__commentlink'],
        postorcomment:'post',
        profilepicture:null
    }
    async componentDidMount()
    {
        this.setState({
            loading:true
        });
        try{
            const userdata=await axios('/user/'+localStorage.getItem('userid')+'?auth='+localStorage.getItem('token'));
            const postdata=await axios('/post/userpostedpost'+'?auth='+localStorage.getItem('token'));
            this.setState({
                user:userdata.data.data,
                postclass:['account__postlink','activeclass'],
                posts:postdata.data.data,
                loading:false
            });
        }catch(err)
        {
            console.log(err.response);
            this.setState({
                loading:false
            });
        }
    }

    selectpost=async()=>{
        try{
            // this.setState({
            //     loading:true
            // });
            const postdata=await axios('/post/userpostedpost'+'?auth='+localStorage.getItem('token'));
            this.setState(
                {
                    posts:postdata.data.data,
                    postclass:['account__postlink','activeclass'],
                    commentclass:['account__commentlink'],
                    loading:false,
                    postorcomment:'post'
                });
        }catch(err)
        {
            console.log(err.response);
            this.setState({
                loading:false
            });
        }
    }

    selectcomment=async()=>{
        try{
            // this.setState({
            //     loading:true
            // });
            const commentdata=await axios('/comment/userpostedcomment'+'?auth='+localStorage.getItem('token'));
            this.setState(
                {
                    comments:commentdata.data.data,
                    postclass:['account__postlink'],
                    commentclass:['account__commentlink','activeclass'],
                    loading:false,
                    postorcomment:'comment'
                });
        }catch(err)
        {
            console.log(err.response);
            this.setState({
                loading:false
            });
        }
    }

    changepicHandler=(e)=>{
        this.setState({
            profilepicture:e.target.files[0]
        })
    }    

    changeprofilepic=async()=>{
        try{
            const formdata=new FormData();
            formdata.append('profilepic',this.state.profilepicture);
            const userdata=await axios({
                method:'POST',
                url:'/user/changeprofilepic?auth='+this.props.token,
                data:formdata
            });
            window.location.reload(true);
        }catch(err)
        {
            console.log(err.response);
        }
    }

    render()
    {
        return (
            <div className='account'>
            {this.state.loading===false?
                <React.Fragment>
                    <div className='account__user'>
                        <div className='account__user__img'>
                            <img src={'/images/userprofile/'+this.state.user.profilepic} className='account__user__pic'></img>
                        </div>
                        <div>
                            <h3 className='account__user__name'>{this.state.user.name}</h3>
                        </div>
                        <div className='account__user__picupload'>
                            {/* <label htmlFor='profilepic'>Change profilepic</label> */}
                            <input type='file' placeholder='Change profile pic' id='profilepic' onChange={(e)=>this.changepicHandler(e)}/>
                            <button className='account__user__picupload__btn' onClick={this.changeprofilepic}>Change pic</button>
                        </div>
                    </div>
                    <div className='account__linkoptions'>
                        <h3 className={this.state.postclass.join(' ')} onClick={this.selectpost}>Posts</h3>
                        <h3 className={this.state.commentclass.join(' ')} onClick={this.selectcomment}>Comments</h3>
                    </div>
                    {this.state.postorcomment==='post'?
                    <div className='account__posts'>
                        <Posts posts={this.state.posts}/>
                    </div>:<div className='account__comments'>
                        {this.state.comments.map(comment=>{
                            return <Comment comment={comment} key={comment._id}/>
                        })}
                    </div>}
                </React.Fragment>
                :<Spinner/>}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Account);