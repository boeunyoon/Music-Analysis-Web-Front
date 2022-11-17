import React, { useContext, useCallback, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../css/Register.css'
import AuthContext from '../context/AuthContext';
const Register = () => {
  let {registerUser} = useContext(AuthContext)
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [password, setPassword] = useState('');
  const onChangePassword = (e) => {
    setPassword(e.target.value)
  }
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  },[password]) 
  return (
    <Form  onSubmit={registerUser}>
      <h2 className='register-string'>Sign Up</h2>
      <div className='register-form'>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter email" name='username'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={password} onChange={onChangePassword} />
        <p style={{color: 'blue'}}>숫자와 문자를 조합하여 비밀번호를 만드세요</p>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password2'value={passwordCheck} required onChange={onChangePasswordCheck} />
        {passwordError && <p style={{color: 'red'}}>비밀번호가 일치하지 않습니다</p>}
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      </div>
    </Form>
  )
}

export default Register