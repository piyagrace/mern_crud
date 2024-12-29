import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

function Chartjs() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    axios.get('http://localhost:3001/solidwaste_data')
      .then(result => {
        // Assuming the result.data is an array of objects with year, month, and waste types
        const data = formatChartData(result.data);
        setChartData(data);
      })
      .catch(err => console.log('Error fetching data:', err));
  }, []);

  const formatChartData = (data) => {
    const months = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
    // Initialize the datasets with the labels and empty data arrays
    const datasets = [
      { label: 'Residuals', data: [], borderColor: '#ffbb2a', backgroundColor: 'rgba(255, 239, 205, 0.5)', fill: true, pointRadius: 3, pointBackgroundColor: '#FF9F1A'},
      { label: 'Biodegradables', data: [], borderColor: '#2489e1', backgroundColor: 'rgba(23, 131, 230, 0.5)', fill: true, pointRadius: 3, pointBackgroundColor: '#2489e1'},
      { label: 'Recyclables', data: [], borderColor: '#4d8833', backgroundColor: 'rgba(87, 141, 60, 0.3)',  fill: true, pointRadius: 3, pointBackgroundColor: '#4d8833'}
    ];

    // Assuming data is ordered and grouped by month and all months are present
    months.forEach(month => {
      const monthData = data.filter(item => item.month === month);
      datasets[0].data.push(monthData.reduce((acc, cur) => acc + cur.residual, 0));
      datasets[1].data.push(monthData.reduce((acc, cur) => acc + cur.biodegradable, 0));
      datasets[2].data.push(monthData.reduce((acc, cur) => acc + cur.recyclable, 0));
    });

    return { labels: months, datasets };
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      tooltip: {
        position: 'average',
        mode: 'index',
        intersect: false
      },
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Solid Waste Generated Chart'
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months'
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
          text: 'Weight (kg)'
        }
      }
    }
  };  

  return (
    <div>
      <h2>Monthly Waste Statistics</h2>
      <Line data={chartData} options={options} />
    </div>
  );
}

export default Chartjs;
