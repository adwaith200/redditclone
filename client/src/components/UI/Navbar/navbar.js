//React imports
import React from 'react';
import {withRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'
import {Nav,NavDropdown} from 'react-bootstrap';
import {connect} from 'react-redux';

//User defined imports
import './navbar.css';

const navbarpic='navbarpic.jpg';

const navbar=props=>{
    const redirect=(page)=>{
        props.history.push(`/${page}`);
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className='narbarimg'>
                <img src={'/images/'+navbarpic} className='navbarpic' alt=''/>
            </div>
            <Navbar.Brand href="#">Reddit</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                </Nav>
                <Nav>
                <Nav.Link eventKey={1}><span onClick={()=>redirect('')}>All posts</span></Nav.Link>
                {props.isauth?<Nav.Link eventKey={2}>
                    <span onClick={()=>redirect('myposts')}>My posts</span>
                </Nav.Link>:null}
                <NavDropdown title="User" id="collasible-nav-dropdown" className='dropdown'>
                    {props.isauth?null:
                    <NavDropdown.Item href="" eventKey={3}><span onClick={()=>redirect('login')}>Login</span></NavDropdown.Item>}
                    {props.isauth?null:
                    <NavDropdown.Item href="" eventKey={4}><span onClick={()=>redirect('signup')}>Sign Up</span></NavDropdown.Item>}
                    {props.isauth?<NavDropdown.Item href="" eventKey={5}><span onClick={()=>redirect('addpost')}>Add post</span></NavDropdown.Item>:null}
                    {props.isauth?<NavDropdown.Item href="" eventKey={6}><span onClick={()=>redirect('account')}>Account</span></NavDropdown.Item>:null}
                    {props.isauth?<NavDropdown.Item href="" eventKey={7}><span onClick={()=>redirect('mycommunites')}>Community</span></NavDropdown.Item>:null}
                    {props.isauth?<NavDropdown.Item href="" eventKey={8}><span onClick={()=>redirect('logout')}>Log Out</span></NavDropdown.Item>:null}
                </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps=state=>{
    return {
        isauth:state.auth.token!==null
    }
}

export default connect(mapStateToProps)(withRouter(navbar));






// <div className='navbar'>
        //     <div>
        //         <p>IMG</p>
        //     </div>
        //     <div className='links'>
        //         <ul className='ul__links'>
        //             <li>All post</li>
        //             <li>My posts</li>
        //             <li>Add post</li>
        //             <li>
        //                 <DropdownButton id="dropdown-basic-button" title="User" key='Secondary'>
        //                     <Dropdown.Item href="#">Action</Dropdown.Item>
        //                     <Dropdown.Item href="/daf">Another action</Dropdown.Item>
        //                     <Dropdown.Item><a href='/yoo'>Something else</a> </Dropdown.Item>
        //                 </DropdownButton>
        //             </li>
        //         </ul>
        //     </div>
        //     {/* <Button variant="primary">Click</Button> */}
        // </div>