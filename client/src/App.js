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
import Allposts from './containers/posts/allposts/allposts';
import Onepost from './containers/posts/onepost/onepost';
import Userposts from './containers/posts/userposts/userposts';
import Addpost from './containers/posts/addpost/addpost';
import Community from './containers/community/community';
import Communities from './containers/communities/communities';
import Createcommunity from './containers/createcommunity/createcommunity';
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
            <Route path='/' exact component={Allposts}/>
            <Route path='/myposts' component={Userposts}/>
            <Route path='/addpost' component={Addpost}/>
            <Route path='/communites' component={Communities}/>
            <Route path='/createcommunity' component={Createcommunity}/>
            <Route path='/community/:communityid' component={Community}/>
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/forgotpassword' component={Forgotpassword}/>
            <Route path='/resetpassword/:token' component={Resetpassword}/>
            <Route path='/:id' component={Onepost}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps=state=>{
  return {
    isauth:state.auth.token!==null
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    autologinHandler:()=>dispatch(autologin())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
