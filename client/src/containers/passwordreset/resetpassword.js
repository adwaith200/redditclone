//React modules
import React, { Component } from 'react';
import {connect} from 'react-redux';

//User defined imports
import Input from '../../components/UI/input/input';
import Button from '../../components/UI/button/button';
import './resetpassword.css';
import {resetpassword} from '../../store/actions/auth';

class Resetpassword extends Component{
    state={
        inputs:[
            {
                type:'password',
                value:'',
                key:1
            },
            {
                type:'passwordconfirm',
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
    resetpasswordHandler=(e)=>{
        e.preventDefault();
        // console.log(this.props.match);
        this.props.resetpasswordauth(this.props.match.params.token,this.state.inputs[0].value,this.state.inputs[1].value);
    }   
    render()
    {
        return (
            <div className='resetpassword'>
                <h1>Reset Your Password</h1>
                <form className='resetpassworddata' onSubmit={this.resetpasswordHandler}>
                    {this.state.inputs.map(ele=>{
                        return <Input key={ele.key} type={ele.type} changed={(e)=>this.inputchangeHandler(ele.key,e)}/>
                    })}
                    <Button type='Reset Password' submit={this.resetpasswordHandler}/>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        resetpasswordauth:(token,password,confirmpassword)=>dispatch(resetpassword(token,password,confirmpassword))
    }
}

export default connect(null,mapDispatchToProps)(Resetpassword);