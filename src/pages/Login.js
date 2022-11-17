import React, {useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../css/Login.css'
const Login = () => {

  let {loginUser} = useContext(AuthContext)
  return (
    <Form onSubmit={loginUser}>
      <h2 className='login-string'>Login</h2>
      <div className='login-form'>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter email" name='username'/>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name='password'/>
        </Form.Group>
        <div className ="login-button-wrapper">
          <Button className ="login-button" variant="primary" type="submit">
            Submit
          </Button>
          <br/>

          <Link to='/register'>Go to Register Page</Link>
        </div>
      </div>
    </Form>
  )
}

export default Login