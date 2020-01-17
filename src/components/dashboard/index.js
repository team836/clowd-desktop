import React from 'react';
import './style.css';
import { Doughnut, Pie } from 'react-chartjs-2';

const DashBoard = () => {
    const data = {
        labels: [
            'usage',
            'non usage'
        ],
        value: 30,
        color: "#F38630",
        label: 'Sleep',
        labelColor: 'white',
        labelFontSize: '10',
        labelAlign: 'left',
        datasets: [{
            data: [223829, 5667],
            backgroundColor: [
                '#FF6384',
                '#36A2EB'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB'
            ]
        }]
    };

    const option = {
        cutoutPercentage: 80,
        // responsive: false,
        // maintainAspectRatio: false,
        responsive: true,
        maintainAspectRatio: false,
        // aspectRatio: 2,
        legend: {
            display: false
        },
        tooltips: {
            callbacks: {
                label: function (tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    var total = meta.total;
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                },
                title: function (tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    }

    return (
        <div className="dashboard">
            <div className="header">
                <div className="dashboard-title"> dashborad </div>
                <div className="setting"></div>
            </div>

            <div className="main">
                <div className="chart">
                    <Doughnut className="chart-doughnut" data={data} options={option} style="height:200px" />

                </div>
                <div className="information">
                    <label className="subject">Ping</label>
                    <br />
                    82ms
                    <br />
                    <label className="subject">Upload</label>
                    <br />
                    15Mbps
                    <br />
                    <label className="subject">Download    </label>
                    <br />
                    17Mbps
                </div>
            </div>

        </div>
    );
}
export default DashBoard;