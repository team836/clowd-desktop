import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './style.css'

const Chart = () => {
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
                '#6C69FF',
                '#FFFFFF'
            ],
            hoverBackgroundColor: [
                '#6C69FF',
                '#FFFFFF'
            ]
        }]
    };

    const option = {
        cutoutPercentage: 80,
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
        <div className="chart">
            <Doughnut data={data} options={option} />
        </div>
    );
}

export default Chart;