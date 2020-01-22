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
    <div id="login-page">
      <h2>here is login page !</h2>
      <button onClick={signIn}>google login</button>
    </div>
  )
}

export default Login
