import React from 'react'
import './style.css'
import Chart from 'react-apexcharts'
import { optionsRadial } from './chartOption'

const DataChart = ({ folderUsage, settingSize }) => {
  let percent = parseInt((folderUsage / settingSize) * 100)
  percent = settingSize === 0 ? 0 : percent
  const seriesRadial = [percent]
  return (
    <div className="chart">
      <Chart
        height="100%"
        options={optionsRadial}
        series={seriesRadial}
        type="radialBar"
      />
    </div>
  )
}
export default DataChart
