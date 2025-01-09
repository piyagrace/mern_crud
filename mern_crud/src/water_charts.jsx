import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

// Import the annotation plugin
import annotationPlugin from 'chartjs-plugin-annotation';

// Register the annotation plugin with Chart.js
import { Chart } from 'chart.js';
Chart.register(annotationPlugin);

// Import the CSS file
import './Chart.css'; // Adjust the path if necessary

function WaterQualityChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    axios.get('http://localhost:3001/waterquality_data')
      .then(response => {
        const formattedData = formatChartData(response.data);
        setChartData(formattedData);
      })
      .catch(err => console.log('Error fetching data:', err));
  }, []);

  const formatChartData = (data) => {
    const parameters = ["pH", "Color", "Fecal_Coliform", "TSS", "Chloride", "Nitrate", "Phosphate"];
    const tankNames = ["U-mall Water Tank", "Main Water Tank"];
    
    // Initialize datasets
    const datasets = tankNames.map((tank, index) => ({
      label: tank,
      data: [],
      borderColor: index === 0 ? 'rgba(112,159,91,255)' : 'rgba(255,227,167,255)',
      backgroundColor: index === 0 ? 'rgba(112,159,91,255)' : 'rgba(255,227,167,255)',
    }));

    // Group data by source_tank
    const groupedData = tankNames.map(tank => data.filter(item => item.source_tank === tank));

    // Calculate average for each parameter
    parameters.forEach((param) => {
      tankNames.forEach((tank, tankIndex) => {
        const tankData = groupedData[tankIndex];
        const average = tankData.length > 0
          ? tankData.reduce((acc, cur) => acc + parseFloat(cur[param]), 0) / tankData.length
          : 0;
        datasets[tankIndex].data.push(parseFloat(average.toFixed(2)));
      });
    });

    return { labels: parameters, datasets };
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: false, // Disable default legend
      },
      title: {
        display: true,
        text: 'Water Quality Comparison',
      },
      annotation: {
        annotations: {
          referenceLine: {
            type: 'line',
            yMin: 5,
            yMax: 5,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: true,
              content: 'Threshold',
              position: 'end',
              backgroundColor: 'rgba(255, 99, 132, 0.8)',
              color: '#fff',
              padding: 6,
              font: {
                weight: 'bold'
              },
              yAdjust: -10,
            }
          }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Parameters'
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Values'
        },
        beginAtZero: true,
        suggestedMax: 15,
      }
    }
  };

  return (
    <div>
      <h2>Water Quality Comparison</h2>
      <Bar data={chartData} options={options} />
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'rgba(112,159,91,255)' }}></span> U-mall Water Tank
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: 'rgba(255,227,167,255)' }}></span> Main Water Tank
        </div>
        <div className="legend-item">
          <span className="legend-dash" style={{ backgroundColor: 'rgba(255,227,167,255)' }}></span> Class A-C Limit (5 mg/L)
        </div>
      </div>
    </div>
  );
}

export default WaterQualityChart;
