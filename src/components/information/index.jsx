import React, { useState } from 'react'
import './style.css'
const Information = () => {
  const [ping] = useState(82)
  const [upload] = useState(32)
  const [download] = useState(17)
  return (
    <div className="information">
      <div className="info">
        <label className="info-subject">Ping</label>
        <br />
        <label className="info-number">{ping}</label>
        <label className="info-unit">ms</label>
        <br />
      </div>
      <div className="info">
        <label className="info-subject">Upload</label>
        <br />
        <label className="info-number">{upload}</label>
        <label className="info-unit">Mbps</label>
        <br />
      </div>
      <div className="info">
        <label className="info-subject">Download</label>
        <br />
        <label className="info-number">{download}</label>
        <label className="info-unit">Mbps</label>
        <br />
      </div>
    </div>
  )
}

export default Information
