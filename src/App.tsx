import React from 'react'
import './App.scss'
import DashBoard from './components/dashboard'
import Coin from './components/coin'

const App: React.FC = () => {
  return (
    <div id="app">
      <DashBoard />
      <Coin />
    </div>
  )
}

export default App
