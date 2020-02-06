import React, { useState } from 'react'
import './style.css'
import Chart from 'react-apexcharts'
import { optionsRadial } from './chartOption'

const DataChart = ({ capacity, folderUsage }) => {
  const seriesRadial = [parseInt(folderUsage / capacity)]
  return (
    <div className="chart">
      <Chart
        options={optionsRadial}
        series={seriesRadial}
        type="radialBar"
        height="100%"
      />
    </div>
  )
}
export default DataChart
