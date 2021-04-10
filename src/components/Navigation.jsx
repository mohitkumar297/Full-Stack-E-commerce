import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'


function Navigation() {

  const [search, setsearch] = useState('')

    const navStyle = {
        color:'white',
        textDecoration: 'none'
    }
    function handleChange(event){
      // console.log(event.target);
      setsearch(event.target.value)
    }
    return (
<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand as={Link} to='/'>Arrow Store</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link as={Link} to='/men'>Men</Nav.Link>
      <Nav.Link as={Link} to='/women'>Women</Nav.Link>
      <Nav.Link as={Link} to='/cart'>Cart</Nav.Link>
      <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
      <Nav.Link as={Link} to='/signup'>Login/Signup</Nav.Link>
    </Nav>
    {/* <Form inline>
      <FormControl type="text" name='searchText' value={search} onChange={handleChange} placeholder="Search" className="mr-sm-2" />
      <Link to={`/search/${search}`}>
      <Button variant="outline-success">Search</Button>
      </Link>
    </Form> */}
    <Form inline method='POST' action='/api/search'>
      <FormControl type="text" name='searchText' value={search} onChange={handleChange} placeholder="Search" className="mr-sm-2" />
      {/* <Link to={`/search/${search}`}> */}
      <Button variant="outline-success" type='submit'>Search</Button>
      {/* </Link> */}
    </Form>
  </Navbar>
</>




        // <nav>

        //     <h1>Arrow Store</h1>
        //     <ul className="nav-links">
        //         <Link style={navStyle} to='/men'>
        //             <li>Men</li>
        //         </Link>
        //         <Link style={navStyle} to='/women'>
        //             <li>Women</li>
        //         </Link>
        //     </ul>
        // </nav>
    )
}

export default Navigation;