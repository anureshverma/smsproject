const express = require('express')
var bodyParser = require('body-parser')

const app = express()
var jsonParser = bodyParser.json()
//var urlencodedParser = bodyParser.urlencoded({ extended: false })

var userData = [];

const accountSid = 'AC283aeb723c4e4929bd9bb6b4fa10b35a';
const authToken = 'b676669a733461670a40d438b50b0476';
const client = require('twilio')(accountSid, authToken);

app.post('/sendMsg', jsonParser, (req, res) => {
    var mobileNo = req.body.mobileNo
    var msg = req.body.msg ? req.body.msg : null 
    console.log("msg",msg)
    if (msg === null){
        var result = userData.find( mNum => mNum.mobileNo === mobileNo);
        if(result){
            msg = result.msg;
        }
    }
    console.log("msgafter",msg);
    if (msg){
        client.messages
        .create({
            body: `${msg}`,
            from: '+13344633171',
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
    }else {
        res.send("Message not Found");
    }

})


app.get('/', (req, res) => {
    res.send(userData)
})

app.post('/', jsonParser, (req, res) => {
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



app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})