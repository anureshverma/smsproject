var fs = require('fs')
const express = require('express')
var pdf = require('html-pdf')
const config = require('../config')
const kafkaSend = require('../kafka/producer.js')

const router = express.Router()

router.get('/', (req, res) => {
    var html = fs.readFileSync(config.htmlFileToConvertInPdf, 'utf8')
    var options = { format: 'Letter' }

    var pdfName = config.htmlFileToConvertInPdf.substring(config.htmlFileToConvertInPdf.lastIndexOf('/') + 1)
    pdfName = pdfName.substring(0, pdfName.lastIndexOf('.'))
    var timeStamp = Date.now()
    var pdfNameWithPath = `${config.PdfFileSavePath}${pdfName}${timeStamp}.pdf`
    console.log('pdfNameWithPath', pdfNameWithPath);

    var messages = JSON.stringify({ "htmlFileWithPath": config.htmlFileToConvertInPdf, "pdfFileWithPath": pdfNameWithPath })
    kafkaSend.sendRecord(messages, 'pdf');

    pdf.create(html, options).toFile(pdfNameWithPath, function (err, result) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(result)
            res.send(result)
        }
    });
})

module.exports = router
