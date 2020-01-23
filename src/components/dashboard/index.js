import React from 'react'
import './style.css'
import Information from 'components/information'
import Chart from 'components/chart'

const DashBoard = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="dashboard-title"> Dashborad </div>
        <div className="setting"></div>
      </div>
      <div className="main">
        <Chart />
        <Information />
      </div>
    </div>
  )
}
export default DashBoard
