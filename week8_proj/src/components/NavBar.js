import React, { Component } from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'


export default class NavBar extends Component {
    render() {
        return (
                <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:"0px"}}>
                    <Container>
                        <Navbar.Brand as={Link} to="/">Fakeshop</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        {/* {this.props.token ?
                        <> */}
                            <Nav.Link as={Link} to="/shop">Shop</Nav.Link>
                            <Nav.Link as={Link} to="/edititems">Edit Items</Nav.Link>
                            <Nav.Link as={Link} to="/createitems">Create Items</Nav.Link>
                            <Nav.Link as={Link} to="/logout">Logout</Nav.Link>

                        {/* </> */}
                        :
                           <Nav.Link as={Link} to="/login">Login</Nav.Link>
                           
                        {/* } */}
                         {/* <Navbar.Text>
                        <a {...this.props.user}></a>
                        </Navbar.Text> */}
                        </Nav>
                        <span className="float-end" style={{color:'white'}}>user: {this.props.user}</span>
                        <br/>
                        <span className="float-end" style={{color:'white'}}>total: ${this.props.getCartTotalPrice().toFixed(2)} items:{this.props.getCartItemTotal()}</span>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        )
    }
}