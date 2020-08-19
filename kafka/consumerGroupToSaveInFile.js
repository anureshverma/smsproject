const fs = require('fs')
const kafka = require('kafka-node')
const smsObject = require('../smsRoutes/models/smsSchema')
const config = require('../config')

console.log("inside consumerGroupToSaveInFile ")

const ConsumerGroup = kafka.ConsumerGroup;
var consumer = new ConsumerGroup({ kafkaHost: config.kafkaHost, groupId: 'saveInFile' }, ['smsTopic', 'pdfTopic'])

try {
    consumer.on('message', async function (message) {
        console.log('########################')
        if(message.key === 'sms'){
            fs.writeFile(config.fileToWriteConsumerDataOfSms, `${message.value}\n`, { 'flag': 'a' }, err => {
                if (err) {
                    return console.error(err)
                }
                console.log("Messaged save successfully")
            })
        }
        if(message.key === 'pdf'){
            fs.writeFile(config.fileToWriteConsumerDataOfPdf, `${message.value}\n`, { 'flag': 'a' }, err => {
                if (err) {
                    return console.error(err)
                }
                console.log("pdf Message save successfully")
            })
        }
        
    })
    consumer.on('error', function (err) {
        console.log('error', err);
    });
} catch (e) {
    console.log(e);
}
