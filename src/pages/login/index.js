import React from 'react'
import './style.css'

const { ipcRenderer } = window.require('electron')

ipcRenderer.on('google-signIn-reply', (event, arg) => {
  console.log(arg)
})

const Login = () => {
  const signIn = () => {
    ipcRenderer.send('google-signIn', 'sign-in')
  }

  return (
    <div className="login-page">
      <h2>here is login page !</h2>
      <button className="login-button" onClick={signIn}></button>
    </div>
  )
}

export default Login
