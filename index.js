const express = require('express')
const mongoose = require('mongoose')
const smsRouter = require('./smsRoutes/sms')
const pdfRouter = require('./pdfRoutes/htmlToPdf')
const config = require('./config.js');
//const kafkaRead = require('./kafka/consumer.js');
const kafkaReadForFile = require('./kafka/consumerGroupToSaveInFile');
const kafkaReadToSaveInDb = require('./kafka/consumerGroupToSaveInDb')
//const createTopic = require('./kafka/createTopic.js');

//createTopic.createTopic();

const port = config.port

const app = express();

mongoose.connect(config.mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const con = mongoose.connection
con.on('open', () => {
    console.log("database connected...")
})

app.use('/sms',smsRouter)
app.use('/pdf',pdfRouter)

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})