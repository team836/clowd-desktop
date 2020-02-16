import React, { useState, useEffect } from 'react'
import './style.scss'

const { ipcRenderer } = window.require('electron')

const Modal = ({ setModalToggle, localSystem, setLocalSystem }) => {
  const [value, setValue] = useState(localSystem.settingSize)
  const [isLoaded, setIsLoaded] = useState(false)
  const [fillWidthPercent, setFillWidthPercent] = useState(
    localSystem.settingPercent
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`modal-wrapper${isLoaded ? ' loaded' : ''}`}
      onClick={(e) => {
        ipcRenderer.sendSync('data-settingSize', parseInt(value))
        let receive = ipcRenderer.sendSync('force-update-data')
        setLocalSystem(receive)
        setIsLoaded(false)
        setTimeout(() => {
          setModalToggle(false)
        }, 200)
      }}
    >
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modal-text">Set the limit(GB)</div>
        <div className="slider-wrapper">
          <div className="slider-background" />
          <div
            className="slider-fill"
            style={{
              width: `${fillWidthPercent}%`
            }}
          />
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={value}
            className="slider"
            id="myRange"
            onChange={(e) => {
              setValue(e.target.value)
              const percent = e.target.value
              setFillWidthPercent(percent)
            }}
          />
        </div>
        <div className="label-wrapper">
          <div
            className="current-label"
            style={{
              // left: `${fillWidthPercent}%`
              left: `calc(${26 /
                10}px + ${fillWidthPercent}% - ${fillWidthPercent /
                100} * ${26}px)`
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
