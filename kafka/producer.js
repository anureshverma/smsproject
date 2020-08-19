const kafka = require('kafka-node');
const config = require('../config')

//const Producer = kafka.Producer;
const Producer = kafka.Producer
const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost });
//const producer = new Producer(client);
const producer = new Producer(client, { partitionerType: 3 });
//const kafka_topic = config.kafkaTopic;
//console.log(kafka_topic);
producer.on("ready", function () {
    console.log("Kafka Producer is connected and ready.");
});

producer.on("error", function (error) {
    console.error("Error in kafks producer connection", error);
});

const KafkaService = {

    sendRecord: (messages, key) => {
        var payloads = []
        if (key === 'sms') {
            payloads = [
                {
                    topic: 'smsTopic',
                    key: 'sms',
                    partition: 0,
                    timestamp: Date.now(),
                    messages: messages
                },

            ];
        }

        if (key === 'pdf') {
            payloads = [
                {
                    topic: 'pdfTopic',
                    key: 'pdf',
                    partition: 0,
                    timestamp: Date.now(),
                    messages: messages
                },

            ];
        }

        producer.send(payloads, (err, data) => {
            if (err) {
                console.log('broker update failed');
            } else {
                console.log('broker update success');
            }
        });
    }
}

module.exports = KafkaService;

