import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Charts from './charts.jsx';

function Users () {
    const [users, setUsers] = useState([])

    useEffect(() =>{
        axios.get('http://localhost:3001/solidwaste_data')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete_solidwaste/'+id)
        .then(res => {console.log(res)
            window.location.reload()})
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <Link to='/create' className='btn btn-success'>Add  +</Link>
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