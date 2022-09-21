const express = require("express")
require("dotenv").config()
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require('socket.io')
const io = socket(server);
const { connect } = require('getstream');
import {getRC} from './db4'
// const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
// const crypto = require('crypto');

const cors = require('cors');
const { json } = require("express");

let idname = new Map();
let idtime = new Map();

let Port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(json())

app.get("/",(req,res)=>{
    res.send("i can hear you")
})

app.get('/data', (req, res) => {
    res.json({
        name: 'hemant',
        id: '212'
    })
})
let notimetestapihit = -1;
 
app.post('/login',(req, res) => {

    var options = {
        port: Port,
        host: '127.0.0.1',
      }; 

    var request = http.request(options);

    request.setHeader('Content-Type', 'application/json');
    request.setHeader('accept', 'application/json');

    let username = req.body.username;
    let password = req.body.password;

    res.status(200).json({
        username: username,
        password: password
    })
})

//#steam work
app.post("/getkeys", (req, res) => {
    let { Token } = req.body;
     console.log('body : ',req.body);

    if(Token==undefined){
        res.status(400).send("Request not have require field")
        return;
    }
    else if (Token == 'vinay@alphalionlogistics.com' || Token == 'hemant@alphalionlogistics.com' || Token == "sumit@alphalionlogistics.com") {
        res.json({
            'STREAM_app_id': '1206058',
            'STREAM_api_key': 'z69d4mqmt5k9',
            'STREAM_api_secret': 'dpyn7u4un96ddpe82ada5243qbngwxp4grs9v4nxnqamnsy4u79md6vxfduuuzp4'
        })
        return;
    } else {
        res.status(401).send('Not Authorized')
        return;
    }
})

app.post("/getchannel", (req, res) => {

    let channel_id = 'driverchat_0b706870-324a-4f25-aad8-7edf9d2580db'
    let channel_type = "driverchat"
    let created_by_id= "hemantsingh123"

    let { STREAM_api_key } = req.body;
 
    if(STREAM_api_key==undefined){
        res.status(400).send("Request not have require field")
        return;
    }
   else if (STREAM_api_key == "z69d4mqmt5k9") {
          res.json({
             channel_id: channel_id,
             channel_type: channel_type,
             created_by_id:created_by_id
          })
            return;
    } else {
        res.status(401).send("Wrong Key");
        return;
    }
})

app.post('/signup',async (req,res)=>{
    
    try {
        const { fullName, username, password, phoneNumber } = req.body;

        const userId = crypto.randomBytes(16).toString('hex');

        const serverClient = connect(api_key, api_secret, app_id);

        const hashedPassword = await bcrypt.hash(password, 10);

        const token = serverClient.createUserToken(userId);

        res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: error });
    }
    
})

app.get('/currentload', (req, res) => {
    res.json({
        'loadno': '2333',
        'shipper': 'JB Hunt',
        'delivery': 'CH Robinson',
        'pickup': 'appt',
    })

   // working on load assignment

})

app.get("/test", (req, res) => {
    notimetestapihit++;
    let response = "No. of time api hit : " + notimetestapihit;
    res.status(200).json({ 'res': response });
})

app.post("/postreq", (req, res) => {
    let phoneno = req.body.phoneno;
    if (phoneno == '9958256360') {
        res.send('found');
        return;
    } else {
        res.send("not found");
        return;
    }
})

app.post("/getassignchannel",async(req,res)=>{



})

app.get("/getimg",async (req,res)=>{
    let url="https://ohio.stream-io-cdn.com/1206058/images/cbdae81d-d31f-4a3a-8204-61e9426e869e.download%20%282%29.jpeg?Key-Pair-Id=APKAIHG36VEWPDULE23Q&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9vaGlvLnN0cmVhbS1pby1jZG4uY29tLzEyMDYwNTgvaW1hZ2VzL2NiZGFlODFkLWQzMWYtNGEzYS04MjA0LTYxZTk0MjZlODY5ZS5kb3dubG9hZCUyMCUyODIlMjkuanBlZz8qb2g9MjU5Km93PTE5NCoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjQ5MTY1OTN9fX1dfQ__&Signature=BkYHuwrcdrt4hgcOUfFx6Y7cY7mC~SeuE44ql8UhhRZc8pSqV90ruvVCdfFyRoM9GB6VTqzKZhY08phPRppPgC-uuh0jh7tDL7u79i95B784l4WuG~zP~VayDvO5GDCow~TVjckhykXKdXPAkCnpRbkrZ2fchWUemArFFVoWy-zYSGGJnE-Q2NbILe71Xf1fN~gAxfABLaAiSlp2PIcloZ-kMXRhPHRahlV8kevexBBwqeB1vXXl8Diw6pEZ7-PxZSLaBkDNDJSrADeY~9YxIpbCDkKMpmSH9ywOO0X-Mxsc1LY2ACWsZ2EQHlGSWdX~Pf0ZC7ZkiCJYcqJNhNvWRg__&oh=259&ow=194"

    res.send(url);

})

app.post('/getload',async (req,res)=>{
    let {load}=req.body;
 
})

function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    console.log('Now : ', time);
    return time;
}

function getname(self) {

    let value = [];

    const mapIter = idname.values();


    let prev = mapIter.next();

    while (prev.value != undefined) {
        if (prev.value != self)
            value.push(prev.value)
        prev = mapIter.next()
    }
    return value;
}

app.listen(Port, () => {
    console.log("server is running", Port);
})