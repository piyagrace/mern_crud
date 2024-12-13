import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Charts from "./charts.jsx";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [years] = useState([2023, 2024]); // Adjust the years as needed

  useEffect(() => {
    let queryParams = "";
    if (selectedMonth) {
      queryParams += `month=${selectedMonth}&`;
    }
    if (selectedYear) {
      queryParams += `year=${selectedYear}&`;
    }

    axios
      .get(`http://localhost:3001/filterUsers?${queryParams}`)
      .then((result) => setUsers(result.data))
      .catch((err) => console.log(err));
  }, [selectedMonth, selectedYear]);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/delete_solidwaste/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  // Transform data into a structure suitable for the table
  const transformData = (data) => {
    const grouped = data.reduce((acc, item) => {
      const key = `${item.year}-${item.month}`;
      if (!acc[key]) {
        acc[key] = {
          year: item.year,
          month: item.month,
          Residuals: 0,
          Biodegradables: 0,
          "Non-Recyclables": 0,
        };
      }
      acc[key][item.wastetype] = item.quantity;
      return acc;
    }, {});

    return Object.values(grouped);
  };

  const transformedData = transformData(users);

  return (
    <div className="d-flex vh-90 bg-success justify-content-center align-items-center">
      <div
        className="w-75 bg-white rounded p-3"
        style={{ marginTop: "30px", marginBottom: "30px" }}
      >
        <Link to="/create" className="btn btn-success">
          Add +
        </Link>
        <p></p>
        <div className="mb-3">
          <label htmlFor="monthSelect" className="form-label">
            Select Month
          </label>
          <select
            id="monthSelect"
            className="form-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            <option value="">All Months</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="yearSelect" className="form-label">
            Select Year
          </label>
          <select
            id="yearSelect"
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <p>
          <center>Total Solid Waste Generated</center>
        </p>

        <table className="table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>            
              <th>Residuals</th>
              <th>Biodegradables</th>
              <th>Recyclables</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
          {transformedData.map((item, index) => {
            const total =
            (item.Residuals || 0) +
            (item.Biodegradables || 0) +
            (item.Recyclables || 0); // Calculate the total

        return (
            <tr key={index}>
            <td>{item.year}</td>
            <td>{item.month}</td>
            <td>{item.Residuals || 0}</td>
            <td>{item.Biodegradables || 0}</td>
            <td>{item.Recyclables || 0}</td>
            <td>{total}</td> 
            </tr>
            );
          })}
          </tbody>
        </table>

        <p> <center> All Data </center></p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Waste Type</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user) => {
                               // eslint-disable-next-line react/jsx-key
                               return <tr>
                                    <td>{user.year}</td>
                                    <td>{user.month}</td>
                                    <td>{user.wastetype}</td>
                                    <td>{user.quantity}</td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
        <Charts />
      </div>
    </div>
  );
}

export default Users;