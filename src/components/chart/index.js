import React from 'react'
import './style.css'
import Chart from 'react-apexcharts'

const DataChart = ({ data, labels, average }) => {
  const myChart = {
    optionsRadial: {
      colors: ['#CF93FF'],
      plotOptions: {
        radialBar: {
          startAngle: 0,
          endAngle: 360,
          background: '#ffffff',

          hollow: {
            margin: 0,
            size: '70%',
            background: '#fff',
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: 'front',
            dropShadow: {
              enabled: true,
              top: 1,
              left: 0,
              blur: 4,
              opacity: 0.2
            }
          },
          track: {
            background: '#fff',
            strokeWidth: '67%',
            margin: 0, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 0,
              left: 1,
              blur: 4,
              opacity: 0.2
            }
          },

          dataLabels: {
            showOn: 'always',
            name: {
              offsetY: -20,
              show: true,
              color: '#888',
              fontSize: '13px'
            },
            value: {
              formatter: function(val) {
                return val
              },
              color: '#111',
              fontSize: '30px',
              show: true
            }
          }
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: 'horizontal',
          shadeIntensity: 0.5,
          gradientToColors: ['#6C69FF'],
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Percent']
    },
    seriesRadial: [60]
  }
  return (
    <div className="chart">
      <Chart
        options={myChart.optionsRadial}
        series={myChart.seriesRadial}
        type="radialBar"
        height="100%"
      />
      {/* <canvas id="myChart" ref={chartRef}></canvas> */}
    </div>
  )
}
export default DataChart
