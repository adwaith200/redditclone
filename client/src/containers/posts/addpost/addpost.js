//React modules
import React, { Component } from 'react';
import axios from '../../../axiosbackend';
import {connect} from 'react-redux';

//User defined modules
import Input from '../../../components/UI/input/input';
import './addpost.css';

class Addpost extends Component{
    state={
        communities:[],
        postedpic:null,
        inputs:[
            {
                type:'',
                value:'',
                key:1,
                data:'Add an interesting title'
            },
            {
                type:'textarea',
                value:'',
                key:2,
                data:''
            }
        ],
    }
    async componentDidMount(){
        try{
            const communitydata=await axios('/community/usercommunity?auth='+localStorage.getItem('token'));
            this.setState({
                communities:communitydata.data.data
            });
        }catch(err)
        {
            console.log(err.response);
        }
    }
    inputchangedHandler=(id,e)=>{
        const index=this.state.inputs.findIndex(input=>input.key===id);
        const myinputs=[...this.state.inputs];
        const myinput={...this.state.inputs[index]};
        myinput.value=e.target.value;
        myinputs[index]=myinput;
        this.setState({
            inputs:myinputs
        });
    }
    
    filehandler=(e)=>{
        this.setState({
            postedpic:e.target.files[0]
        });
    }

    postsubmitHandler=async()=>{
        let communityid;
        this.state.communities.forEach(comm=>{
            if(comm.name===document.querySelector('.selectinput').value)
            {
                communityid=comm._id;
            }
        })
        const formdata=new FormData();
        formdata.append('title',this.state.inputs[0].value);
        formdata.append('description',this.state.inputs[1].value);
        formdata.append('community',communityid);
        formdata.append('postedpic',this.state.postedpic);
        try{
            const communitydata=await axios({
                method:'POST',
                url:'/post?auth='+this.props.token,
                data:formdata
            });
            this.props.history.push('/');
        }catch(err)
        {
            console.log(err.response);
        }
    }

    render() 
    {
        return (
            <div className='addpost'>
                <h2 className='addpost__heading'>Add post</h2>
                <div className='addpost__input'>
                    <select className='input selectinput'>
                        {this.state.communities.map(com=>{
                            return <option value={com.name} key={com._id}>{com.name}</option>
                        })}
                    </select>
                    {this.state.inputs.map(input=>{
                        return <Input type={input.type} data={input.data} key={input.key} changed={(e)=>this.inputchangedHandler(input.key,e)}/>
                    })}
                    <Input type='file' changed={(e)=>this.filehandler(e)}/>
                    <button className='addpost__btn' onClick={this.postsubmitHandler}>Post</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        token:state.auth.token
    }
}

export default connect(mapStateToProps)(Addpost);