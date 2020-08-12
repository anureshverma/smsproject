const mongoose = require('mongoose')

const msgSchema = new mongoose.Schema({
    mobileNo: { type: String },
    msg: { type: String },
})

module.exports = mongoose.model('messages',msgSchema)