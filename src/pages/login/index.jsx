import React from 'react'
import './style.css'
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
      <button className="login-button" onClick={signIn}></button>
    </div>
  )
}

export default Login
