//React modules
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

//User defined modules
import {logout} from '../../../store/actions/auth';

class Logout extends Component{
    state={
        loggedout:false
    }
    componentDidMount()
    {
        this.props.logoutHandler();
        this.setState({
            loggedout:true
        });
    }
    render()
    {
        return (
            <div>
                {this.state.loggedout?<Redirect to='/'/>:null}
            </div>
        );
    }
}

const mapStateToProps=state=>{
    return {
        isauth:!state.auth.token!==null        
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        logoutHandler:()=>dispatch(logout())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Logout);