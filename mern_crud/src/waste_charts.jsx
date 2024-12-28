import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


export default function App() {
    const [chartData, setChartData] = useState([]);

    useEffect(() =>{
        axios.get('http://localhost:3001/solidwaste_data')
        .then(result => setChartData(result.data))
        .catch(err => console.log(err))
    }, [])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" padding={{ left: 30, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />

        {/* Area for "pv" with filled area and dots */}
        <Area
          type="monotone"
          dataKey="residual"
          stroke="#ffbb2a"
          fill="#ffefcd"
          fillOpacity={0.3}
          dot={{ r: 5, stroke: "#ffbb2a", strokeWidth: 2, fill: "#fff" }} // Customized dots
          activeDot={{ r: 7 }} // Enlarged dots on hover
        />

        {/* Area for "uv" with filled area and dots */}
        <Area
          type="monotone"
          dataKey="biodegradable"
          stroke="#2087e2"
          fill="#2f8ddf"
          fillOpacity={0.3}
          dot={{ r: 5, stroke: "#82ca9d", strokeWidth: 2, fill: "#fff" }} // Customized dots
          activeDot={{ r: 7 }} // Enlarged dots on hover
        />

        <Area
          type="monotone"
          dataKey="recyclable"
          stroke="#508935"
          fill="#4d8732"
          fillOpacity={0.3}
          dot={{ r: 5, stroke: "#82ca9d", strokeWidth: 2, fill: "#fff" }} // Customized dots
          activeDot={{ r: 7 }} // Enlarged dots on hover
        />        
      </AreaChart>
    </ResponsiveContainer>
  );
}
