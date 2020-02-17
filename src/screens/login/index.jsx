import React, { useState } from 'react'
import './style.scss'
import SignIn from '../../assets/images/google-signIn.jpg'
const { ipcRenderer } = window.require('electron')

const Login = () => {
  const [toggle, setToggle] = useState(false)
  ipcRenderer.on('google-signIn-reply', (event, arg) => {
    console.log(arg)
  })
  const signIn = () => {
    ipcRenderer.send('google-signIn', 'sign-in')
  }
  return (
    <div className="login-page">
      {toggle ? (
        <webview id="webview" src="https://dev.api.clowd.xyz/v1/auth/login" />
      ) : (
        <div>
          <div className="image-wrapper" onClick={() => setToggle(!toggle)}>
            <img src={SignIn} className="sign-in" alt="sign-in" />
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
