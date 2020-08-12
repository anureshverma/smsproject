const express = require('express')
const mongoose = require('mongoose')
const smsRouter = require('./smsRoutes/sms')

const app = express()

mongoose.connect('mongodb://localhost/sms_database_dev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const con = mongoose.connection
con.on('open', () => {
    console.log("database connected...")
})

app.use('/sms',smsRouter)

app.listen(3000, () => {
    console.log(`app listening at http://localhost:3000`)
})