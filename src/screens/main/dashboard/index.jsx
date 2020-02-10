import React, { useState } from 'react'
import './style.css'
import Information from '../information'
import DataChart from '../chart'
import Modal from '../modal'
import { ReactComponent as Icon } from '../../../assets/icons/Union.svg'

const DashBoard = ({ folderUsage, settingSize }) => {
  const [toggle, setToggle] = useState(false)

  return (
    <div className="dashboard">
      <div className="header">
        {toggle && <Modal setToggle={setToggle} />}
        <div className="dashboard-title"> Dashborad </div>
        <div className="setting">
          <Icon
            className="setting-icon"
            alt="setting"
            onClick={() => setToggle(!toggle)}
          />
        </div>
      </div>
      <div className="main">
        <DataChart folderUsage={folderUsage} settingSize={settingSize} />
        <Information />
      </div>
    </div>
  )
}
export default DashBoard
