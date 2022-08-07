const { application } = require('express')
const express = require('express')
require('dotenv').config()
const app = express()



app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})

app.use( express.static('public') );

//Lectura y parseo del body
app.use(express.json())

//rutas
app.use('/api/auth', require('./routes/auth'))

