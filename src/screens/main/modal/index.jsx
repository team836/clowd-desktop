import React, { useState, useEffect } from 'react'
import './style.scss'

const Modal = ({ setToggle }) => {
  const [limit, setLimit] = useState(40)
  const [isLoaded, setIsLoaded] = useState(false)
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
          <input
            type="range"
            min="1"
            max="100"
            value={limit}
            className="slider"
            id="myRange"
            onRateChange={() => {
              console.log('123')
            }}
          ></input>
        </div>
      </div>
    </div>
  )
}

export default Modal
