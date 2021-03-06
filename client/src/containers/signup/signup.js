 //React modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

//Userdefined modules
import Spinner from '../../components/UI/spinner/spinner';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import './signup.css';
import {signupstart} from '../../store/actions/auth';

class Signup extends Component{
    state={
        inputs:[
            {
                type:'text',
                value:'',
                key:1,
                data:'Enter your name' 
            },
            {
                type:'email',
                value:'',
                key:2,
                data:''
            },
            {
                type:'password',
                value:'',
                key:3,
                data:''
            },
            {
                type:'passwordconfirm',
                value:'',
                key:4,
                data:''
            }
        ],
        allfielderror:false,
        passworderror:false
    }
    inputchangeHandler=(id,e)=>{
        const index=this.state.inputs.findIndex(el=>el.key===id);
        const myinput={...this.state.inputs[index]};
        myinput.value=e.target.value;
        const myinputarr=[...this.state.inputs];
        myinputarr[index]=myinput;
        this.setState({
            inputs:myinputarr
        });
    }
    submitloginHandler=(e)=>{
        e.preventDefault();
        let error=false;
        this.state.inputs.forEach(input=>{
            if(input.value==='')
            {
                this.setState({
                    allfielderror:true
                });
                error=true;
            }
        });
        if(this.state.inputs[2].value!==this.state.inputs[3].value)
        {
            this.setState({
                passworderror:true
            });
            error=true;
        }
        if(!error)
        {
            this.props.signupHandler(this.state.inputs[0].value,this.state.inputs[1].value,this.state.inputs[2].value,this.state.inputs[3].value);
        }
    }
    componentDidMount(){
        this.setState({
            passworderror:false,
            allfielderror:false
        });
    }
    render()
    {
        return (
            <div className='signup'>
                {this.props.loading?
                <Spinner/>:
                <React.Fragment>
                    {this.props.isauth?<Redirect to='/'/>:null}
                    <h1>Sign Up</h1>
                    {this.state.allfielderror?<span className='validator'>Please fill all the fields</span>:null}
                    {this.state.passworderror?<span className='validator'>Both the passwords dont match</span>:null}
                    <form className='signupdata'>
                        {this.state.inputs.map(ele=>{
                            return <Input key={ele.key} type={ele.type} data={ele.data} changed={(e)=>this.inputchangeHandler(ele.key,e)}/>
                        })}  
                        <Button type='Sign Up' submit={this.submitloginHandler}/>
                    </form>
                </React.Fragment>}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        isauth:state.auth.token!==null,
        loading:state.auth.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        signupHandler:(name,email,password,confirmpassword)=>dispatch(signupstart(name,email,password,confirmpassword))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Signup);