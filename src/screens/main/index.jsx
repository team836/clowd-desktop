import React, { useEffect, useState } from 'react'
import './style.scss'
import Granim from 'granim'

const App = () => {
  const [value, setValue] = useState(50)
  const [fillWidthPercent, setFillWidthPercent] = useState(50)

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
      <canvas id="clowd-desktop-background" />
      <h1 className="header">
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
