import React from 'react'
import { Navbar, Nav } from 'react-bootstrap';
import Link from 'next/link'
import { setSession } from '../../functions/authUtils';
import { useRouter } from 'next/router';
/**
* @author
* @function Topbar
**/

const Topbar = (props) => {

    const router = useRouter();

    const logout = () =>{
        setSession(null);
        router.push('/auth/signin');
    }

  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
                <Link href="/account/home"><Nav.Link href="/account/home">Home</Nav.Link></Link>
                <Link href="/account/features"><Nav.Link href="/account/features">Features</Nav.Link></Link>
            </Nav>
            <Nav>
                <Link href="/auth/signup"><Nav.Link href="/auth/signup">Sign Up</Nav.Link></Link>
                <Link href="/auth/signin"><Nav.Link href="/auth/signin">Sign In</Nav.Link></Link>
                {props.isLogged && <Nav.Link onClick={() => logout()}>Logout</Nav.Link>}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
   )

 }

export default Topbar