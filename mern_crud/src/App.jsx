import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import CreateUser from './CreateUser'
import UpdateUser from './UpdateUser'
import Charts from './charts'
import Users from './Users'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

   return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Users />}></Route>
        <Route path='/create' element={<CreateUser />}></Route>
        <Route path='/update/:id' element={<UpdateUser />}></Route>
        <Route path='/charts' element={<Charts />}></Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
