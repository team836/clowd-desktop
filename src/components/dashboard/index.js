import React from 'react'
import './style.css'
import Information from 'components/information'
<<<<<<< HEAD
import DataChart from 'components/chart'
=======
import Chart from 'components/chart'
>>>>>>> hoonki

const DashBoard = () => {
  return (
    <div className="dashboard">
      <div className="header">
        <div className="dashboard-title"> Dashborad </div>
        <div className="setting"></div>
      </div>
      <div className="main">
<<<<<<< HEAD
        <DataChart />
=======
        <Chart />
>>>>>>> hoonki
        <Information />
      </div>
    </div>
  )
}
export default DashBoard
