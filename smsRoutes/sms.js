const express = require('express')
var bodyParser = require('body-parser')
const kafkaSend = require('../kafka/producer.js');
const config = require('../config.js');

const router = express.Router()

var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var userData = [];

const accountSid = config.twilioAccountSid;
const authToken = config.twilioAuthToken;
const client = require('twilio')(accountSid, authToken);

router.post('/sendMsg', jsonParser, (req, res) => {
    var mobileNo = req.body.mobileNo
    var msg = req.body.msg ? req.body.msg : null
    console.log("msg", msg)
    if (msg === null) {
        var result = userData.find(mNum => mNum.mobileNo === mobileNo);
        if (result) {
            msg = result.msg;
        }
    }
    console.log("msgafter", msg);
    if (msg) {
        var messages = JSON.stringify({ "mobileNo": mobileNo, "msg": msg })
        kafkaSend.sendRecord(messages, 'sms');
        client.messages
            .create({
                body: `${msg}`,
                from: config.twilioNumber,
                to: `${mobileNo}`
            })
            .then(message => {
                console.log(message.sid)
                res.send(message.sid)
            })
            .catch(err => {
                console.log("error in send");
                res.send(err)
            });
    } else {
        res.send("Error: Message not Found");
    }

})

router.get('/', (req, res) => {
    res.send(userData)
})

router.post('/', jsonParser, (req, res) => {
    const obj = {
        mobileNo: req.body.mobileNo,
        msg: req.body.msg
    }
    try {
        userData.push(obj)
        res.json(obj)
    } catch{
        res.send('Error in save data')
    }
    // res.send('Got a POST request')
});

module.exports = router

