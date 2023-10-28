import React from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import logo from '../img/logo.png';
import { FaHome, FaRegAddressCard, FaBuysellads } from 'react-icons/fa';
import { BiMessageRoundedAdd } from 'react-icons/bi';
import { RiInformationLine, RiLogoutCircleLine } from 'react-icons/ri';

function NnavBar() {
  const navigate = useNavigate();
  let token;
  let decoded;
  try {
    token = localStorage.getItem('token');

    if (token) {
      decoded = jwt_decode(token);
    }
    // console.log('Token:', token);
    console.log('Decoded:', decoded.role);
  } catch (error) {
    console.log('Invalid token', error);
  }

  function handleLogout() {
    if (token) {
      localStorage.removeItem('token');
      navigate('/');
      window.location.reload();
    } else {
      return;
    }
  }

 return (
     <div>
         {!token && (
             <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                 <Container fluid>
                     <Navbar.Brand>
                         <Image src={logo} width={"50px"} />
                     </Navbar.Brand>
                     <Navbar.Brand href="/home">
                         <h2>SYS</h2>
                     </Navbar.Brand>
                     <Navbar.Toggle aria-controls="navbarScroll" />
                     <Navbar.Collapse id="navbarScroll">
                         <Nav className="justify-content-end flex-grow-1 pe-3">
                             <Nav.Link href="/home">
                                 <FaHome className="me-1" />
                                 Home
                             </Nav.Link>
                             {/* <Nav.Link href="/">
                                <FaBuysellads className="me-1" />
                                Ads
                              </Nav.Link> */}
                             <Nav.Link href="/signup">
                                 <FaRegAddressCard className="me-1" />
                                 Sign Up
                             </Nav.Link>
                             <Nav.Link href="/login">
                                 <RiInformationLine className="me-1" />
                                 Log In
                             </Nav.Link>
                         </Nav>
                     </Navbar.Collapse>
                 </Container>
             </Navbar>
         )}
         {token && decoded.role === "buyer" && (
             <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                 <Container fluid>
                     <Navbar.Brand>
                         <Image src={logo} width={"50px"} />
                     </Navbar.Brand>
                     <Navbar.Brand href="/home">SYS</Navbar.Brand>
                     <Navbar.Toggle aria-controls="navbarScroll" />
                     <Navbar.Collapse id="navbarScroll">
                         <Nav className="justify-content-end flex-grow-1 pe-3">
                             {/* <NavBar.Brand>{decoded.email}</NavBar.Brand> */}
                             <Nav.Link href="/home">
                                 <FaHome className="me-1" />
                                 Home
                             </Nav.Link>
                             <Nav.Link href="/">
                                 <FaBuysellads className="me-1" />
                                 Ads
                             </Nav.Link>
                             {/* <Nav.Link href="/form">
                                 <BiMessageRoundedAdd className="me-1" />
                                 Post an ad
                             </Nav.Link> */}
                             <Nav.Link onClick={handleLogout}>
                                 <RiLogoutCircleLine className="me-1" />
                                 Log out
                             </Nav.Link>
                         </Nav>
                     </Navbar.Collapse>
                 </Container>
             </Navbar>
         )}
         {token && decoded.role === "seller" && (
             <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                 <Container fluid>
                     <Navbar.Brand>
                         <Image src={logo} width={"50px"} />
                     </Navbar.Brand>
                     <Navbar.Brand href="/home">SYS</Navbar.Brand>
                     <Navbar.Toggle aria-controls="navbarScroll" />
                     <Navbar.Collapse id="navbarScroll">
                         <Nav className="justify-content-end flex-grow-1 pe-3">
                             {/* <NavBar.Brand>{decoded.email}</NavBar.Brand> */}
                             <Nav.Link href="/home">
                                 <FaHome className="me-1" />
                                 Home
                             </Nav.Link>
                             <Nav.Link href="/">
                                 <FaBuysellads className="me-1" />
                                 Ads
                             </Nav.Link>
                             <Nav.Link href="/form">
                                 <BiMessageRoundedAdd className="me-1" />
                                 Post an ad
                             </Nav.Link>
                             <Nav.Link onClick={handleLogout}>
                                 <RiLogoutCircleLine className="me-1" />
                                 Log out
                             </Nav.Link>
                         </Nav>
                     </Navbar.Collapse>
                 </Container>
             </Navbar>
         )}
     </div>
 );
 }
  export default NnavBar;


