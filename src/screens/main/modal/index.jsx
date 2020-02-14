import React, { useState, useEffect } from 'react'
import './style.scss'

const Modal = ({ setToggle }) => {
  const [value, setValue] = useState(50)
  const [isLoaded, setIsLoaded] = useState(false)
  const [fillWidthPercent, setFillWidthPercent] = useState(50)
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`modal-wrapper${isLoaded ? ' loaded' : ''}`}
      onClick={(e) => {
        setIsLoaded(false)
        setTimeout(() => {
          setToggle(false)
        }, 200)
      }}
    >
      <div
        className="modal"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="modal-text">Set the limit</div>
        <div className="slider-wrapper">
          <div className="bar-background" />
          <div
            className="bar-fill"
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
          {/* <div className="start-label">0</div> */}
          <div
            className="current-label"
            style={{
              left: `calc(${26 /
                10}px + ${fillWidthPercent}% - ${fillWidthPercent /
                100} * ${26}px)`
              // left: `calc(${fillWidthPercent}%)`
            }}
          >
            {value}
          </div>
          {/* <div className="end-label">100</div> */}
        </div>
      </div>
    </div>
  )
}

export default Modal
