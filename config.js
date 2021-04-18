const config = {
    port: 3000,
    kafkaHost: 'localhost:9092',
    //kafkaTopic: 'testTopic1',
    twilioAccountSid: '',
    twilioAuthToken: '',
    twilioNumber: '+13344633171',
    mongoDbUrl: 'mongodb://localhost/sms_database_dev', //sms_database_dev is db name
    htmlFileToConvertInPdf: '/home/anuresh/Downloads/test.html',
    PdfFileSavePath: '/tmp/',
    fileToWriteConsumerDataOfSms: '/tmp/messages.txt',
    fileToWriteConsumerDataOfPdf: '/tmp/pdfsData.txt',
}

module.exports = config
