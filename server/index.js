const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userModel = require('./models/Users')
const userModel2 = require('./models/solid_waste')

const app = express()
app.use(cors())
app.use(express.json())

const db1 = mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.get('/solid_waste', (req, res) => {
    userModel2.find({}, { type: 1, amount: 1, _id: 0 }) 
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.post("/add_solid_waste", (req, res) => {
    userModel2.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
}) 

app.get('/', (req, res) => {
    userModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndUpdate({_id:id}, {
        name: req.body.name, 
        email: req.body.email, 
        age: req.body.age
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    userModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.post("/createUser", (req, res) => {
    userModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
}) 

app.listen(3001, () => {
    console.log("Sever is Running")
})