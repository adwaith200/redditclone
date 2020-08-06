//React modules
import React, { Component } from 'react';
import axios from '../../axiosbackend';
import {connect} from 'react-redux';

//User defined modules
import Input from '../../components/UI/input/input';
import './createcommunity.css';

class Createcommunity extends Component{
    state={
        communitypic:null,
        validationerror:null,
        inputs:[
            {
                type:'',
                value:'',
                key:1,
                data:'Enter community name'
            },
            {
                type:'textarea',
                value:'',
                key:2,
                data:''
            }
        ],
    }

    componentDidMount(){
        this.setState({
            validationerror:null
        });
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
            communitypic:e.target.files[0]
        });
    }

    postsubmitHandler=async()=>{
        const formdata=new FormData();
        formdata.append('name',this.state.inputs[0].value);
        formdata.append('description',this.state.inputs[1].value);
        formdata.append('communitypic',this.state.communitypic);
        if(this.state.inputs[0].value!==''&&this.state.inputs[1].value!=='')
        {
            try{
                const communitydata=await axios({
                    method:'POST',
                    url:'/community?auth='+this.props.token,
                    data:formdata
                });
                this.props.history.push('/communites');
            }catch(err)
            {
                console.log(err.response);
            }
        }else
        {
            this.setState({
                validationerror:true
            });
        }
    }

    render()
    {
        return (
            <div className='createcommunity'>
                <h2 className='createcommunity__heading'>Create community</h2>
                <div className='createcommunity__input'>
                    {this.state.validationerror?<p className='createcommunity__validation'>Enter the fields</p>:null}
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

export default connect(mapStateToProps)(Createcommunity);