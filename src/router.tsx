import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import { Login, Main } from './screens'

const Router: React.FC = () => (
  <BrowserRouter>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Main} />
  </BrowserRouter>
)

export default Router
