const { application } = require('express')
const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
require('dotenv').config()

//create server express
const app = express()

//database
dbConnection()

//cors
app.use(cors())



app.listen(process.env.PORT || 9001, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

app.use( express.static('public') );

//Lectura y parseo del body
app.use(express.json())

//rutas
app.use('/api/auth', require('./routes/auth'))
app.use("/api/events", require("./routes/event"));

