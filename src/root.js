import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import App from './App'
import { Login } from './pages'

const Root = () => (
  <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={App} />
  </BrowserRouter>
)

export default Root
