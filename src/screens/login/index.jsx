import React from 'react'
import './style.scss'
import SignIn from '../../assets/images/google-signIn.jpg'
const { ipcRenderer } = window.require('electron')

const Login = () => {
  ipcRenderer.on('google-signIn-reply', (event, arg) => {
    console.log(arg)
  })
  const signIn = () => {
    ipcRenderer.send('google-signIn', 'sign-in')
  }
  return (
    <div className="login-page">
      <div className="image-wrapper">
        <img src={SignIn} className="sign-in" onClick={signIn} alt="sign-in" />
      </div>
      {/* <button className="login-button" onClick={signIn}></button> */}
    </div>
  )
}

export default Login
