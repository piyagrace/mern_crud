import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Legend, Tooltip, Cell } from "recharts";

function Charts () {
    const [chartData, setChartData] = useState([]);

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    useEffect(() =>{
        axios.get('http://localhost:3001/solid_waste')
        .then(result => setChartData(result.data))
        .catch(err => console.log(err))
    }, [])
      
    return( 
    <div>
    <p> <center>Charts </center> </p>
    <PieChart width={800} height={300}>
      <Pie
        dataKey="amount"
        nameKey="type"
        isAnimationActive={false}
        data={chartData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        label
        >
        {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
    </Pie>
      <Tooltip />
      <Legend verticalAlign="top" height={36}/>

    </PieChart>
    
    </div>
    )
}

export default Charts;