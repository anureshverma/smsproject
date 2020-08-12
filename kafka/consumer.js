const kafka = require('kafka-node')
const smsObject = require('../smsRoutes/models/smsSchema')

console.log("inside consumer ")

try {
    const Consumer = kafka.Consumer;
    const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
    let consumer = new Consumer(
        client,
        [{ topic: 'testTopic1', partition: 0 }],
        {
            autoCommit: true,
            fetchMaxWaitMs: 1000,
            fetchMaxBytes: 1024 * 1024,
            encoding: 'utf8',
            fromOffset: false
        }
    );
    consumer.on('message', async function (message) {
        console.log('kafka message: ',message.value);
        let obj = JSON.parse(message.value);
        const sms = new smsObject({
            mobileNo: obj.mobileNo,
            msg: obj.msg
        })
        try{
            await sms.save()
            console.log("sms",sms)
        }catch (err){
            console.log("Error in saving object ",err)
        }
    })
    consumer.on('error', function (err) {
        console.log('error', err);
    });
} catch (e) {
    console.log(e);
}
