import React from 'react'
import './style.css'
import Information from 'components/information'
import DataChart from 'components/chart'
import UnionSVG from '../../assets/icons/Union.svg'
import { setServers } from 'dns'

const DashBoard = ({ folderUsage, settingSize }) => {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="dashboard-title"> Dashborad </div>
        <div className="setting">
          <img src={UnionSVG} />
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
