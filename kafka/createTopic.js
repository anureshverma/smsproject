const kafka = require('kafka-node');
const config = require('../config')

const client = new kafka.KafkaClient({ kafkaHost: config.kafkaHost });

/* const createTopicService = {

  createTopic: async () => { */
const topicToCreate = [{
  topic: config.kafkaTopic,
  partitions: 1,
  replicationFactor: 1
}
];

client.createTopics(topicToCreate, (error, result) => {
  console.log(result, 'topic created successfully');
});
/*   }
}

module.exports = createTopicService */