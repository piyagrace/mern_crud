
import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function CreateUser (){
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [wastetype, setWasteType] = useState()
    const [quantity, setQuantity] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/add_solidwaste", {year, month, wastetype, quantity})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-tems-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Submit}>
                    <h2>Add Data</h2>
                    <div className='mb-2'>
                        <label>Year:</label>
                        <input type="text" placeholder='Enter Year' className='form-control'
                        onChange={(e) => setYear(e.target.value)} />                       
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Month:</label>
                        <input type="text" placeholder='Enter Month' className='form-control'
                        onChange={(e) => setMonth(e.target.value)}
                        />                       
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Waste Type:</label>
                        <input type="text" placeholder='Enter Waste Type' className='form-control'
                        onChange={(e) => setWasteType(e.target.value)}
                        />                       
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Quantity (kg):</label>
                        <input type="text" placeholder='Enter Quantity' className='form-control'
                        onChange={(e) => setQuantity(e.target.value)}
                        />                       
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default CreateUser;