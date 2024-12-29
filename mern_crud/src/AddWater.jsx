import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddWater() {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [source_tank, setSource_tank] = useState('');
    const [pH, setPH] = useState('');
    const [Color, setColor] = useState('');
    const [Fecal_Coliform, setFecal_Coliform] = useState('');
    const [TSS, setTSS] = useState('');
    const [Chloride, setChloride] = useState('');
    const [Nitrate, setNitrate] = useState('');
    const [Phosphate, setPhosphate] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [options_source_tank] = useState([
        "U-mall Water Tank",
        "Main Water Tank",
      ]);

    const validateInput = () => {
        // Check if year is a valid number and is a four-digit year
        if (!/^\d{4}$/.test(year)) {
            return "Please enter a valid four-digit year.";
        }
        // Check for valid month entry
        if (!month || month.trim().length === 0) {
            return "Month is required.";
        }
        // Check if residual, biodegradable, and recyclable are numbers
        if (isNaN(pH) || isNaN(Color) || isNaN(Fecal_Coliform) || isNaN(Nitrate) || isNaN(Phosphate) || isNaN(TSS) || isNaN(Chloride)) {
            return "Residual, Biodegradable, and Recyclable must be valid numbers.";
        }
        // Check if any of the values are empty
        if (pH.trim() === '' || Color.trim() === '' || Fecal_Coliform.trim() === '' || TSS.trim() === '' || Chloride.trim() === '' || Nitrate.trim() === '' || Phosphate.trim() === '') {
            return "All fields must be filled.";
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errorMessage = validateInput();
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setError(''); // Clear any existing errors

        axios.post("http://localhost:3001/add_waterquality", { year, month, source_tank, pH, Color, Fecal_Coliform, TSS, Chloride, Nitrate, Phosphate })
            .then(result => {
                console.log(result);
                navigate('/');
            })
            .catch(err => {
                console.log(err);
                setError('Failed to create data. Please try again.');
            });
    };

    return (
        <div className='d-flex vh-90 bg-success justify-content-center align-tems-center'>
            <div className='w-50 bg-white rounded p-3' style={{ marginTop: "30px", marginBottom: "30px" }}>
                <form onSubmit={handleSubmit}>
                    <h2>Add Water Quality Data </h2> <p>(Do not include comma in values) </p>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='mb-2'>
                        <label>Year:</label>
                        <input type="text" placeholder='Enter Year' className='form-control'
                            value={year}
                            onChange={(e) => setYear(e.target.value)} />
                    </div>
                    <div className='mb-2'>
                        <label>Month:</label>
                        <input type="text" placeholder='Enter Month' className='form-control'
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">

              <label htmlFor="monthSelect" className="form-label">
                Source Tank:
              </label>
              <select
                id="monthSelect"
                className="form-select"
                value={source_tank}
                onChange={(e) => setSource_tank(e.target.value)}
              >
                <option value="">Select Source Tank</option>
                {options_source_tank.map((source, index) => (
                  <option key={index} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>
                    <div className='mb-2'>
                        <label>ph: </label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={pH}
                            onChange={(e) => setPH(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Color: </label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={Color}
                            onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Fecal_Coliform:</label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={Fecal_Coliform}
                            onChange={(e) => setFecal_Coliform(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>TSS:</label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={TSS}
                            onChange={(e) => setTSS(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Chloride:</label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={Chloride}
                            onChange={(e) => setChloride(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Nitrate:</label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={Nitrate}
                            onChange={(e) => setNitrate(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label>Phosphate:</label>
                        <input type="text" placeholder='Enter Data' className='form-control'
                            value={Phosphate}
                            onChange={(e) => setPhosphate(e.target.value)}
                        />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default AddWater;
