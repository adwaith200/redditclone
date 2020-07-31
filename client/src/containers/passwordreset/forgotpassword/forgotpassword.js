//React modules
import React, { Component } from 'react';

//User defined modules
import axios from '../../../axiosbackend';
import Input from '../../../components/UI/input/input';
import Button from '../../../components/UI/button/button';
import './forgotpassword.css';

class Forgotpassword extends Component{
    state={
        email:''
    }
    changeemailHandler=(e)=>{
        this.setState({
            email:e.target.value
        })
    }
    sendmailHandler=async(e)=>{
        e.preventDefault();
        try{
            alert('password reset link sent to mail');
            const data=await axios({
                method:'POST',
                url:'/user/forgotpassword',
                data:{
                    email:this.state.email
                }
            });
            // console.log(data);
        }catch(err)
        {
            console.log(err);
        }
    }

    render()
    {
        return (
            <div className='forgotpassword'>
                <h1>Forgot password?</h1>
                <form className='forgotpassworddata' onSubmit={this.sendmailHandler}>
                    <Input type='email' changed={(e)=>this.changeemailHandler(e)}/>
                    <Button type='Send email' submit={this.sendmailHandler}/>
                </form>
            </div>
        )
    }
}

export default Forgotpassword