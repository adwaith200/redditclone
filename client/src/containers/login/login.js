//React modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

//Userdefined modules
import Spinner from '../../components/UI/spinner/spinner';
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import './login.css';
import {loginstart} from '../../store/actions/auth';

class Login extends Component{
    state={
        inputs:[
            {
                type:'email',
                value:'',
                key:1
            },
            {
                type:'password',
                value:'',
                key:2
            }
        ],
        isvalid:true
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
    submitloginHandler=async(e)=>{
        e.preventDefault();
        this.props.loginhandler(this.state.inputs[0].value,this.state.inputs[1].value);
    }
    render()
    {
        return (
            <div className='login'>
                {this.props.loading?<Spinner/>:
                <React.Fragment>
                {this.props.isauth?<Redirect to='/'/>:null}
                <h1>Login</h1>
                {this.props.error?<span className='validator'>Invalid email or password</span>:null} 
                <form className='logindata' onSubmit={this.submitloginHandler}>
                    {this.state.inputs.map(ele=>{
                        return <Input key={ele.key} type={ele.type} changed={(e)=>this.inputchangeHandler(ele.key,e)}/>
                    })}  
                    <Button type='Login' submit={this.submitloginHandler}/>
                    <div className='login__links'>
                        <Link to='/signup'>SignUp</Link>
                        <Link to='/forgotpassword'>Forgot password?</Link>
                    </div>
                </form>
                </React.Fragment>}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        isauth:state.auth.token!==null,
        loading:state.auth.loading,
        error:state.auth.error
    }
}

const mapDispathToProps=dispatch=>{
    return {
        loginhandler:(email,password)=>dispatch(loginstart(email,password))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Login);