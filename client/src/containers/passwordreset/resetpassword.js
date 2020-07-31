//React modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

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
        ],
        err:false,
        redirect:false
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
        if(this.state.inputs[0].value===this.state.inputs[1].value)
        {
            this.props.resetpasswordauth(this.props.match.params.token,this.state.inputs[0].value,this.state.inputs[1].value);
            this.setState({
                redirect:true
            });
        }
        else
        {
            this.setState({
                err:true
            })
        }
    }   
    componentDidMount(){
        this.setState({
            redirect:false,
            err:false
        });
    }
    render()
    {
        return (
            <div className='resetpassword'>
                {this.state.redirect?<Redirect to='/login'/>:
                <React.Fragment>
                    <h1>Reset Your Password</h1>
                    {this.state.err?<span className='validator'>Invalid email or password</span>:null}
                    <form className='resetpassworddata' onSubmit={this.resetpasswordHandler}>
                        {this.state.inputs.map(ele=>{
                            return <Input key={ele.key} type={ele.type} changed={(e)=>this.inputchangeHandler(ele.key,e)}/>
                        })}
                        <Button type='Reset Password' submit={this.resetpasswordHandler}/>
                    </form>
                </React.Fragment>}
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