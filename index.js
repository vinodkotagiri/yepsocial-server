const express = require('express')
require('dotenv').config()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

//Import routes
const authRoutes = require('./routes/route.auth')

//Express app
const app = express()
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//DB
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true })
	.then(console.log('Database connection established'))
	.catch((error) => console.log('Error connecting to database: ' + error))

//Routes
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 12000
app.listen(PORT, () => console.log(`Server listening on ${PORT}`))
