const kafka = require('kafka-node');

const client = new kafka.KafkaClient({kafkaHost: 'localhost:9092'});


const topicToCreate = [{
    topic: 'testTopic1',
    partitions: 1,
    replicationFactor: 1
  }
  ];

client.createTopics(topicToCreate, (error, result) => {
    console.log(result, 'topic created successfully');
});
