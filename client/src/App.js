//React imports
import React, { Component } from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';

//User defined imports

import {autologin} from './store/actions/auth';
import Navbar from './components/UI/Navbar/navbar';
import Login from './containers/login/login';
import Signup from './containers/signup/signup';
import Logout from './containers/login/logout/logout';
import Forgotpassword from './containers/passwordreset/forgotpassword/forgotpassword';
import Resetpassword from './containers/passwordreset/resetpassword';
import './App.css';



class App extends Component {
  componentDidMount(){
    this.props.autologinHandler();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route path='/' exact render={()=><h1>hello</h1>}/>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/forgotpassword' component={Forgotpassword}/>
            <Route path='/resetpassword/:token' component={Resetpassword}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    autologinHandler:()=>dispatch(autologin())
  }
}

export default connect(null,mapDispatchToProps)(App);
