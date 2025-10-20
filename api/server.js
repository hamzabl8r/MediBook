console.clear()
const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./connect')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT


const Appointment = require('./routes/Appointment')
const user = require('./routes/user')
const Current = require('./routes/user')
const Contact = require('./routes/contactRoutes')

 

connectDB() 
app.use(express.json())
const corsOptions = {
  origin: [
    'https://medibook-project.vercel.app/',
    'http://localhost:3000', 
    'http://localhost:5173'  
  ],
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello World!')
})
 

app.use('/appointement' ,Appointment)
app.use('/current' ,Current)
app.use('/user' ,user)
app.use('/contact', Contact)



 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

     