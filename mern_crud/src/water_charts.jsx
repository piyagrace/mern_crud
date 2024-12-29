import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

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
        datasets[tankIndex].data.push(average);
      });
    });

    return { labels: parameters, datasets };
  };

  const options = {
    responsive: true,
    interaction: {
        mode: 'index',
      },
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Water Quality Comparison',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Parameters'
        },
        ticks: {
          autoSkip: false,  // Prevent labels from being skipped
          maxRotation: 45,  // Max rotation angle in degrees
          minRotation: 45   // Min rotation angle in degrees
        }
      },      
      y: {
        title: {
            display: true,
            text: 'Values'
          }    
      }
    }
  };

  return (
    <div>
      <h2>Water Quality Comparison</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default WaterQualityChart;
