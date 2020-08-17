const config = {
    port: 3000,
    kafkaHost: 'localhost:9092',
    kafkaTopic: 'testTopic1',
    twilioAccountSid: 'AC283aeb723c4e4929bd9bb6b4fa10b35a',
    twilioAuthToken: 'b676669a733461670a40d438b50b0476',
    twilioNumber: '+13344633171',
    mongoDbUrl: 'mongodb://localhost/sms_database_dev', //sms_database_dev is db name
    htmlFileToConvertInPdf: '/home/anuresh/Downloads/test.html',
    PdfFileSavePath: '/tmp/'
}

module.exports = config