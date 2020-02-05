import React, { useEffect } from 'react'
import DashBoard from '../../components/dashboard'
import Coin from '../../components/coin'
import './style.scss'
const { ipcRenderer } = window.require('electron')

ipcRenderer.on('main-update-data-res', (event, arg) => {
  console.log(arg)
})

const App: React.FC = () => {
  useEffect(() => {
    ipcRenderer.send('main-update-data')
    setInterval(() => {
      ipcRenderer.send('main-update-data')
    }, 10000)
  }, [])
  return (
    <div id="app">
      <DashBoard />
      <Coin />
    </div>
  )
}

export default App
