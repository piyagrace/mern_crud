import React, { useEffect, useState, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import axios from 'axios';

function AirQualityChart() {
  // Reference to store the original data for toggling
  const originalChartData = useRef({
    CO: 0,
    NO2: 0,
    SO2: 0
  });

  // State for chart data
  const [chartData, setChartData] = useState({
    labels: ['CO', 'NO₂', 'SO₂'], // Labels for the x-axis
    datasets: [
      { 
        label: 'Air Quality', // Single dataset label
        data: [0, 0, 0], // Initialize with zeros
        borderColor: [
          '#ffbb2a', // CO border color
          '#2489e1', // NO₂ border color
          '#4d8833'  // SO₂ border color
        ],
        backgroundColor: [
          'rgba(255, 239, 205, 0.5)', // CO background color
          'rgba(23, 131, 230, 0.5)',  // NO₂ background color
          'rgba(87, 141, 60, 0.3)'    // SO₂ background color
        ],
        borderWidth: 1
      }
    ]
  });

  // State for selected year and month
  const [selectedYear, setSelectedYear] = useState(2024); // Default year
  const [selectedMonth, setSelectedMonth] = useState('August'); // Default month
  const [error, setError] = useState(null); // State for error handling

  // List of years and months for dropdowns
  const years = [2021, 2022, 2023, 2024, 2025];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  useEffect(() => {
    // Fetch data whenever selectedYear or selectedMonth changes
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/airquality_data', {
          params: {
            year: selectedYear,
            month: selectedMonth
          }
        });

        const data = response.data;

        // Store original data for toggling
        originalChartData.current = {
          CO: data.CO,
          NO2: data.NO2,
          SO2: data.SO2
        };

        // Update chart data with all pollutant values
        setChartData(prevState => ({
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: [data.CO, data.NO2, data.SO2]
            }
          ]
        }));
        setError(null); // Reset error
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Error fetching data');
        // Reset chart data if there's an error
        setChartData(prevState => ({
          ...prevState,
          datasets: [
            {
              ...prevState.datasets[0],
              data: [null, null, null] // Hide all bars
            }
          ]
        }));
      }
    };

    fetchData();
  }, [selectedYear, selectedMonth]);

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          // Override the default legend label generator
          generateLabels: function(chart) {
            const dataset = chart.data.datasets[0];
            return chart.data.labels.map((label, index) => ({
              text: label,
              fillStyle: dataset.backgroundColor[index],
              strokeStyle: dataset.borderColor[index],
              lineWidth: dataset.borderWidth,
              index: index
            }));
          }
        },
        // Handle legend click events
        onClick: function(e, legendItem, legend) {
          const index = legendItem.index;
          const chart = legend.chart;
          const dataset = chart.data.datasets[0];
          
          // Toggle visibility by setting the data value to null or restoring it
          if (dataset.data[index] !== null) {
            dataset.data[index] = null; // Hide the bar
          } else {
            // Restore the original data value
            const originalValue = originalChartData.current[
              chart.data.labels[index].replace('₂', '2') // Convert subscript to normal character
            ];
            dataset.data[index] = originalValue;
          }
          
          chart.update();
        }
      },
      title: {
        display: true,
        text: `Air Quality in CvSU - Indang Campus for ${selectedMonth} ${selectedYear}`
      }
    }
  };

  return (
    <div>
      <h2>Air Quality Index</h2>
      
      {/* Dropdowns for Year and Month Selection */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>
          Year:
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            style={{ marginLeft: '5px' }}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </label>

        <label>
          Month:
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ marginLeft: '5px' }}
          >
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Bar Chart */}
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default AirQualityChart;
