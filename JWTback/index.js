'use strict'

const express = require('express')
const app = express()
const dotenv = require('dotenv').config({ path: 'ENV_FILENAME' });
const mongoose = require('mongoose')
const cors = require('cors')
// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const validate = require('./routes/refresh')

dotenv.config()

//let db = "mongodb+srv://orelnya:OrelMan10@cluster0.ag3sz.mongodb.net/app?retryWrites=true&w=majority"

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
    console.log('connected to DB')
  }
)
//mongoose.connect(
//  db, { useNewUrlParser: true }, () => {
//    console.log('connected to DB')
//  }
//)

// Middleware
app.use(express.json())
app.use(cors())

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/validate', validate)

app.use('/api/posts', postRoute)

//app.listen(8000, () => console.log('Server is up and running'))
app.listen(9000, () => console.log('Server is up and running'))
