const mongoose = require('mongoose')

mongoose.pluralize(null)

const pdfDataSchema = new mongoose.Schema({
    htmlFileNameWithPath: { type: String },
    pdfFileNameWithPath: { type: String },
})

module.exports = mongoose.model('pdfsData',pdfDataSchema)