const kafka = require('kafka-node');
const config = require('../config')

const Producer = kafka.Producer;
const client = new kafka.KafkaClient({ kafkaHost: config.KafkaHost });
const producer = new Producer(client);
const kafka_topic = config.topic;
console.log(kafka_topic);
producer.on("ready", function () {
    console.log("Kafka Producer is connected and ready.");
});

producer.on("error", function (error) {
    console.error("Error in kafks producer connection", error);
});

const KafkaService = {

    sendRecord: (mobileNo, msg) => {
        let payloads = [
            {
                topic: kafka_topic,
                messages: JSON.stringify({ "mobileNo": mobileNo, "msg": msg })
            }
        ];

        producer.send(payloads, (err, data) => {
            if (err) {
                console.log(kafka_topic + ': broker update failed');
            } else {
                console.log(kafka_topic + ': broker update success');
            }
        });
    }
}

module.exports = KafkaService;

