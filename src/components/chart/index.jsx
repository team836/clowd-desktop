import React, { useState, useEffect } from 'react'
import './style.css'
import Chart from 'react-apexcharts'
import { optionsRadial } from './chartOption'
const { ipcRenderer } = window.require('electron')

const DataChart = () => {
  const [totalData, totalDataSet] = useState(0)
  const [data, dataSet] = useState(0)
  const seriesRadial = [data]
  ipcRenderer.on('fetch-main-res', (event, arg) => {
    dataSet(parseFloat((arg.usage / arg.total).toFixed(2)))
    totalDataSet(arg.total)
  })
  useEffect(() => {
    ipcRenderer.send('fetch-main')
  }, [])

  const connect = () => {
    console.log('connect')
    ipcRenderer.send('connect-socket', 'requset')
  }
  const test = () => {
    console.log('test')
    ipcRenderer.send('test', 'hehehe')
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
      <button onClick={test}>test</button>
    </div>
  )
}
export default DataChart
