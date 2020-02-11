import React, { useState, useEffect } from 'react'
import './style.scss'

const Modal = ({ setToggle }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`modal-wrapper${isLoaded ? ' loaded' : ''}`}
      onClick={() => {
        setIsLoaded(false)
        setTimeout(() => {
          setToggle(false)
        }, 200)
      }}
    >
      <div className="modal">
        <div className="modal-text">Set the limit</div>
      </div>
    </div>
  )
}

export default Modal
