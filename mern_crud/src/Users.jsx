import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Charts from './charts.jsx';

function Users () {
    const [users, setUsers] = useState([])
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [months] = useState([
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ]);
    const [years] = useState([2023, 2024]); // Modify this list based on available years
    
    useEffect(() => {
        let queryParams = "";
        if (selectedMonth) {
            queryParams += `month=${selectedMonth}&`;
        }
        if (selectedYear) {
            queryParams += `year=${selectedYear}&`;
        }
        axios.get(`http://localhost:3001/filterUsers?${queryParams}`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, [selectedMonth, selectedYear]);

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete_solidwaste/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-90 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3" style={{ marginTop: '30px' , marginBottom: '30px' }}>
                <Link to='/create' className='btn btn-success'>Add  +</Link>
                <p></p>
                <div className="mb-3">
                    <label htmlFor="monthSelect" className="form-label">Select Month</label>
                    <select 
                        id="monthSelect" 
                        className="form-select" 
                        value={selectedMonth} 
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                        <option value="">All Months</option>
                        {months.map((month, index) => (
                            <option key={index} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="yearSelect" className="form-label">Select Year</label>
                    <select 
                        id="yearSelect" 
                        className="form-select" 
                        value={selectedYear} 
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">All Years</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
                <p> <center> Total Solid Waste Generated </center></p>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Waste Type</th>
                            <th>Quantity</th>
                            <th>Action</th>
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
                                    <td>
                                    <Link to= {`/update/${user._id}`} className='btn btn-success'>Update</Link>
                                    <button className='btn btn-danger' onClick={(e) => handleDelete(user._id)}>Delete</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                <Charts />
            </div>
        </div>
    )
}

export default Users;