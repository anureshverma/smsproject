const kafka = require('kafka-node')
const config = require('../config')

const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost })

var kafkaTopics = ['smsTopic', 'pdfTopic']
var topicsToCreate = [];

if (kafkaTopics.length) {
    kafkaTopics.forEach(element => {
        let topicToCreate = {
            topic: element,
            partitions: 1,
            replicationFactor: 1
        }
        topicsToCreate.push(topicToCreate)
    });

    client.createTopics(topicsToCreate, (error, result) => {
        console.log(result, 'topic created successfully');
    });
} else {
    console.log("Provide atleast one kafka Topic name");
}