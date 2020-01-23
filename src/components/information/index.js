import React from 'react'
import './style.css'
const Information = () => {
  return (
    <div className="information">
      <div className="info">
        <label className="info-subject">Ping</label>
        <br />
        <label className="info-number">82</label>
        <label className="info-unit">ms</label>
        <br />
      </div>
      <div className="info">
        <label className="info-subject">Upload</label>
        <br />
        <label className="info-number">15</label>
        <label className="info-unit">Mbps</label>
        <br />
      </div>
      <div className="info">
        <label className="info-subject">Download</label>
        <br />
        <label className="info-number">17</label>
        <label className="info-unit">Mbps</label>
        <br />
      </div>
    </div>
  )
}

export default Information
