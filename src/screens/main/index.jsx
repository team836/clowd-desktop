import React, { useEffect, useState } from 'react'
import { ReactComponent as Icon } from '../../assets/icons/Union.svg'
import Granim from 'granim'
import Modal from './modal'
import './style.scss'

const { ipcRenderer } = window.require('electron')

const App = () => {
  const [localSystem, setLocalSystem] = useState({})
  const [modalToggle, setModalToggle] = useState(false)

  const updateSignal = () => {
    let receive
    receive = ipcRenderer.sendSync('update-data')
    setLocalSystem({
      ...receive
    })
  }

  useEffect(() => {
    updateSignal()
    setInterval(() => {
      updateSignal()
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
            ['#1CD8D2', '#93EDC7'],
            ['#1CA7EC', '#1F2F98'],
            ['#FEB16D', '#E33981']
          ]
        }
      }
    })
  }, [])

  return (
    <div id="app">
      {modalToggle && (
        <Modal
          setModalToggle={setModalToggle}
          localSystem={localSystem}
          setLocalSystem={setLocalSystem}
        />
      )}
      <canvas id="clowd-desktop-background" />
      <h1 className="header">
        <div className="icon-wrapper">
          <Icon
            className="setting-icon"
            alt="setting"
            onClick={() => setModalToggle(!modalToggle)}
          />
        </div>
        <div className="text">
          <span className="amount">{localSystem.fileCount}</span>
          <span className="unit">Files</span>
        </div>
        <div className="bar-background">
          <div
            className="bar-fill"
            style={{ width: `${localSystem.folderPercent}%` }}
          ></div>
        </div>
      </h1>
    </div>
  )
}

export default App
