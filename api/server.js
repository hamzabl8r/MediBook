console.clear()
const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./connect')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000 


const allowedOrigins = [
    'https://medi-book-views.vercel.app',
    
];

const corsOptions = {
    origin: function (origin, callback ) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
    optionsSuccessStatus: 204 
}

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 

// --- FIN DE LA CONFIGURATION CORS CORRIGÉE ---


const Appointment = require('./routes/Appointment')
const user = require('./routes/user')
const Current = require('./routes/user') 
const Contact = require('./routes/contactRoutes')


connectDB() 
app.use(express.json()) 


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
