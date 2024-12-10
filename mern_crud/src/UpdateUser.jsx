import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function UpdateUser (){
    const {id} = useParams()
    const [year, setYear] = useState()
    const [month, setMonth] = useState()
    const [wastetype, setWasteType] = useState()
    const [quantity, setQuantity] = useState()
    const navigate = useNavigate()

    useEffect(() =>{
        axios.get('http://localhost:3001/get_solidwaste/'+id)
        .then(result => {console.log(result)
            setYear(result.data.year)
            setMonth(result.data.month)
            setWasteType(result.data.wastetype)
            setQuantity(result.data.quantity)
        })
        .catch(err => console.log(err))
    }, [])

    const Update = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/update_solidwaste/"+id, {year, month, wastetype, quantity})
        .then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-tems-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={Update}>
                    <h2>Update User</h2>
                    <div className='mb-2'>
                        <label>Year:</label>
                        <input type="text" placeholder='Enter Year' className='form-control'
                         value={year}  onChange={(e) => setYear(e.target.value)}  
                        />                       
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Month:</label>
                        <input type="text" placeholder='Enter Month' className='form-control'
                        value={month}  onChange={(e) => setMonth(e.target.value)}
                        />                       
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Waste Type:</label>
                        <input type="text" placeholder='Enter Waste Type' className='form-control'
                        value={wastetype}  onChange={(e) => setWasteType(e.target.value)}
                        />                       
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Quantity:</label>
                        <input type="text" placeholder='Enter Quantity' className='form-control'
                        value={quantity}  onChange={(e) => setQuantity(e.target.value)}
                        />                       
                    </div>
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;