import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {useContext, useEffect, useState} from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { MdOutlineMusicNote } from "react-icons/md";
function NavbarContainer() {
  let [user1, setUser] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [authTokens, setAuthTokens] = useState(()=>localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [login, setLogin] = useState(false)
  let [username, setUsername] = useState('')
  const navigate = useNavigate()
  const user=localStorage.getItem('authTokens')
  useEffect(()=>{
    if(user === null){
      setLogin(false)
    } else {
      setLogin(true)
    }
    setUsername(localStorage.getItem('userInfo'))
  },[])
  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
    window.location.replace("/login")
}

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" style={{textShadow: '2px 2px 2px gray'}}><MdOutlineMusicNote size='25px'/>MAW</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#/login">Login</Nav.Link>
          <Nav.Link href="#/register">Sign up</Nav.Link>
          <NavDropdown title="Analysis" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/analyzeonemusic">Analysis One Music</NavDropdown.Item>
              <NavDropdown.Item href="#/analyzeonemusictwo">Analysis Two Music</NavDropdown.Item>
              <NavDropdown.Item href="#/analyzedate">Analysis Date</NavDropdown.Item>
              <NavDropdown.Item href="#/recommend">Recommendation</NavDropdown.Item>
              <NavDropdown.Item href="#/searchartist">Analysis artist</NavDropdown.Item>
              <NavDropdown.Item href="#/musicfeature">Search music feature</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {login ?<div><Link style={{color:'white'}} to = "/profile">Welcome {username}</Link> </div>: null}
        { login ? <Button style={{marginLeft: '10px'}} variant="secondary" onClick={logoutUser}>Logout</Button> : null}
      </Container>
    </Navbar>
  )
}

export default NavbarContainer;