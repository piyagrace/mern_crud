const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your models (if they’re needed in other routes)
const userModel = require('./models/Users');
const userModel2 = require('./models/solid_waste');
const userModel3 = require('./models/wastedata');

// Import the pdfRoutes
const pdfRoutes = require('./routes/pdfRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// -------------------- Connect to MongoDB --------------------
// Use .then/.catch instead of a try/catch around an async call
mongoose
  .connect(
    'mongodb+srv://kiepufyy:XXbgZOBc4H7pwHoF@upcodb.rlq5b.mongodb.net/data?retryWrites=true&w=majority&appName=UPCODB',
  )
  .then(() => {
    console.log('Database connected successfully');

    // Mount your routes AFTER the connection is up
    app.use('/api/pdf', pdfRoutes);

  })
  .catch((error) => {
    console.log('Database connection failed:', error);
  });

app.get('/filterUsers', (req, res) => {
    const { month, year } = req.query;

    let filter = {};
    if (month) {
        filter.month = month;  // assuming the user model has a 'month' field
    }
    if (year) {
        filter.year = year; // assuming the user model has a 'year' field
    }

    userModel3.find(filter)
        .then(users => res.json(users))
        .catch(err => res.json(err));
});


app.post("/add_solidwaste", (req, res) => {
    userModel3.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/solidwaste_data', (req, res) => {
    userModel3.find({}, { _id: 1, year: 1, month: 1, wastetype: 1, quantity: 1 }) 
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.get('/chart_data', (req, res) => { 
    userModel3.find({ year: 2024, month: "November" }, { _id: 1, year: 1, month: 1, wastetype: 1, quantity: 1 })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


app.delete('/delete_solidwaste/:id', (req, res) => {
    const id = req.params.id;
    userModel3.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})

app.get('/get_solidwaste/:id', (req, res) => {
    const id = req.params.id;
    userModel2serModel3.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/update_solidwaste/:id', (req, res) => {
    const id = req.params.id;
    userModel3.findByIdAndUpdate({_id:id}, {
        year: req.body.year,
        month: req.body.month,
        wastetype: req.body.wastetype,
        quantity: req.body.quantity
    })
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

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
    userModel3.find({})
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