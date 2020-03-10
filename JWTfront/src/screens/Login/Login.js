'use strict'

import React, { useRef } from 'react'
import axios from 'axios'
import { login } from '../../api/verify'
import { Link } from 'react-router-dom'

const Login = props => {
  const usernameRef = useRef('')
  const passwordRef = useRef('')

  const loginHandler = () => {
    // console.log(usernameRef.current.value)
    let user = {
      email: usernameRef.current.value,
      password: passwordRef.current.value
    }

    login(user)
  }

  return (
    <div className='Login'>
      <div className='login-container'>
        <div className='login-box'>
          <div className='inputs'>
            <input type='text' placeholder='Username' className='username' ref={usernameRef} />
            <input type='password' placeholder='Password' className='password' ref={passwordRef} />
          </div>
          <div className='sumbit-container'>
            <Link to="/posts">
              <div className='sumbit' onClick={loginHandler}>{'Sumbit'}</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
