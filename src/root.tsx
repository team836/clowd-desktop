import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import App from './App'
import { Login } from './pages'

const Root: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={App} />
  </BrowserRouter>
)

export default Root
