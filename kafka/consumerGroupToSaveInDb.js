const kafka = require('kafka-node')
const smsObject = require('../smsRoutes/models/smsSchema')
const config = require('../config')

console.log("inside consumerGropupTosaveInDb")

const ConsumerGroup = kafka.ConsumerGroup;
var consumer = new ConsumerGroup({ kafkaHost: config.kafkaHost, groupId: 'saveInDb' }, 'smsTopic')

try {
    consumer.on('message', async function (message) {
        console.log("***********************")
        console.log('message',message)
        console.log('kafka message: ', message.value);
        let obj = JSON.parse(message.value);
        const sms = new smsObject({
            mobileNo: obj.mobileNo,
            msg: obj.msg
        })
        try {
            await sms.save()
            console.log("sms", sms)
        } catch (err) {
            console.log("Error in saving object ", err)
        }
    })
    consumer.on('error', function (err) {
        console.log('error', err);
    });
} catch (e) {
    console.log(e)
}