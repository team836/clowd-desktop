import React, { useEffect, useState } from 'react'
import { ReactComponent as Icon } from '../../assets/icons/Union.svg'
import Granim from 'granim'
import Modal from './modal'
import './style.scss'

const { ipcRenderer } = window.require('electron')

const App = () => {
  const [value, setValue] = useState(50)
  const [fillWidthPercent, setFillWidthPercent] = useState(0)
  const [folderUsage, setFolderUsage] = useState(0)
  const [settingSize, setSettingSize] = useState(0)
  const [toggle, setToggle] = useState(false)

  ipcRenderer.on('main-update-data-res', (event, arg) => {
    setFolderUsage(arg.folderUsage)
    setSettingSize(arg.settingSize)
    setFillWidthPercent((arg.folderUsage / arg.settingSize) * 100)
  })
  useEffect(() => {
    ipcRenderer.send('main-update-data')
    setInterval(() => {
      ipcRenderer.send('main-update-data')
    }, 20000)
  }, [])

  useEffect(() => {
    const granimInstance = new Granim({
      element: '#clowd-desktop-background',
      name: 'granim',
      opacity: [1, 1],
      states: {
        'default-state': {
          gradients: [
            ['#834D9B', '#D04ED6'],
            ['#1CD8D2', '#93EDC7']
          ]
        }
      }
    })
  }, [])

  return (
    <div id="app">
      {toggle && <Modal setToggle={setToggle} />}
      <canvas id="clowd-desktop-background" />
      <h1 className="header">
        <div className="icon-wrapper">
          <Icon
            className="setting-icon"
            alt="setting"
            onClick={() => setToggle(!toggle)}
          />
        </div>
        <div className="text">
          <span className="amount">2189</span>
          <span className="unit">Files</span>
        </div>
        <div className="bar-background">
          <div
            className="bar-fill"
            style={{ width: `${fillWidthPercent}%` }}
          ></div>
        </div>
      </h1>
    </div>
  )
}

export default App
