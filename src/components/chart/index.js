import React, { useState, useEffect } from 'react'
import './style.css'
import Chart from 'react-apexcharts'
import { optionsRadial } from './chartOption'
const { ipcRenderer } = window.require('electron')

const DataChart = () => {
  const [totalData, totalDataSet] = useState(5)
  const [data, dataSet] = useState(0)
  const seriesRadial = [data]
  ipcRenderer.on('get-size-res', (event, arg) => {
    dataSet(parseFloat((arg / totalData).toFixed(2)))
  })
  useEffect(() => {
    ipcRenderer.send('get-size')
  }, [])

  const connect = () => {
    console.log('connect')
    ipcRenderer.send('connect-socket', 'requset')
  }
  return (
    <div className="chart">
      <Chart
        options={optionsRadial}
        series={seriesRadial}
        type="radialBar"
        height="100%"
      />
      <button
        onClick={() => {
          dataSet(data - 5)
        }}
      >
        -
      </button>

      <button
        onClick={() => {
          dataSet(data + 5)
        }}
      >
        +
      </button>
      <button onClick={connect}>connect</button>
    </div>
  )
}
export default DataChart
