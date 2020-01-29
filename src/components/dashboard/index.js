import React from 'react'
import './style.css'
import Information from 'components/information'
import DataChart from 'components/chart'
import UnionSVG from '../../assets/icons/Union.svg'

const DashBoard = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="dashboard-title"> Dashborad </div>
        <div className="setting">
          <img src={UnionSVG} />
        </div>
      </div>
      <div className="main">
        <DataChart />
        <Information />
      </div>
    </div>
  )
}
export default DashBoard
