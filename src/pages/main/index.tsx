import React, { useEffect, useState } from 'react'
import DashBoard from '../../components/dashboard'
import Coin from '../../components/coin'
import './style.scss'
const { ipcRenderer } = window.require('electron')

const App: React.FC = () => {
  const [capacity, setCapacity] = useState(0)
  const [folderUsage, setFolderUsage] = useState(0)
  ipcRenderer.on('main-update-data-res', (event, arg) => {
    setCapacity(arg.capacity)
    setFolderUsage(arg.folderUsage)

    console.log(arg.capacity, arg.folderUsage)
  })
  useEffect(() => {
    ipcRenderer.send('main-update-data')
    setInterval(() => {
      ipcRenderer.send('main-update-data')
    }, 10000)
  }, [])
  return (
    <div id="app">
      <DashBoard capacity={capacity} folderUsage={folderUsage} />
      <Coin />
    </div>
  )
}

export default App
