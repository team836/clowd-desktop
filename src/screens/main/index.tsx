import React, { useEffect, useState } from 'react'
import DashBoard from './dashboard'
import Coin from './coin'
import './style.scss'
const { ipcRenderer } = window.require('electron')

const App: React.FC = () => {
  const [folderUsage, setFolderUsage] = useState(0)
  const [settingSize, setSettingSize] = useState(0)
  ipcRenderer.on('main-update-data-res', (event, arg) => {
    setFolderUsage(arg.folderUsage)
    setSettingSize(arg.settingSize)
  })
  useEffect(() => {
    ipcRenderer.send('main-update-data')
    setInterval(() => {
      ipcRenderer.send('main-update-data')
    }, 20000)
  }, [])
  return (
    <div id="app">
      <DashBoard folderUsage={folderUsage} settingSize={settingSize} />
      <Coin />
    </div>
  )
}

export default App
