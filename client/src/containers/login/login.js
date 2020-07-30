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
        ]
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
                <form className='logindata' onSubmit={this.submitloginHandler}>
                    {this.state.inputs.map(ele=>{
                        return <Input key={ele.key} type={ele.type} changed={(e)=>this.inputchangeHandler(ele.key,e)}/>
                    })}  
                    <Button type='Login' submit={this.submitloginHandler}/>
                    <Link to='/forgotpassword'>Forgot password?</Link>
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

const mapDispathToProps=dispatch=>{
    return {
        loginhandler:(email,password)=>dispatch(loginstart(email,password))
    }
}

export default connect(mapStateToProps,mapDispathToProps)(Login);