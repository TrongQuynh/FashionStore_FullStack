import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { FaSearch, FaUserAlt, FaShoppingCart } from "react-icons/fa";
import style from "../assets/css/Navbar.module.css";
import React from 'react'

const Header = () => {
  return (
    <div className='header'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="justify-content-center">
            <Navbar.Brand href="#home">HanShop</Navbar.Brand>
          </Nav>
          <Nav>
            <Nav.Link href="#deets" className={style.icon}><FaSearch /></Nav.Link>
            <Nav.Link href="#deets" className={style.icon}><FaUserAlt /></Nav.Link>
            <Nav.Link href="/cart" className={style.icon}><FaShoppingCart /></Nav.Link>
          </Nav>
        </Container>
      </Navbar >

      <Navbar bg="light">

        <Nav.Link href="/" className={`ms-5 ${style.collection}`}>Trang Chu</Nav.Link>

        <NavDropdown title="Bộ Sưu Tập" className={`${style.collection}`} id="collection_1">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="SẢN PHẨM" className={style.collection} id="collection_2">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
        </NavDropdown>
        
        <Nav.Link href="#deets" className={`${style.collection}`}> Outfit Of The Day</Nav.Link>

        <NavDropdown title="HƯỚNG DẪN - CHÍNH SÁCH" className={style.collection} id="collection_3">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
  )
}

export default Header