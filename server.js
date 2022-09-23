const express = require("express")
require("dotenv").config()
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require('socket.io')
const io = socket(server, { cors: { origin: "*" } });
var bodyParser = require('body-parser');
const fs = require('fs');
const { setLoadConfirmationDoc } = require('./DB/load')

// const { connect } = require('getstream');
// import {getRC} from './db4'
// const bcrypt = require('bcrypt');
// const StreamChat = require('stream-chat').StreamChat;
// const crypto = require('crypto'); 
const cors = require('cors');
const { rmSync } = require("fs");
const { database } = require("firebase-admin");
// const { json } = require("express");

let idname = new Map();
let idtime = new Map();

let WS = io.of("/")

let Port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json('application/json'));

// app.use((req,res,next)=>{
// let headers={
//     'Content-Type': 'application/json',
//     'Content-Length': '12332',
//     'ETag': '123453'
//   }
// res.set(headers)
//       next()
// })
// let data1={
//     'name':'hemant',
//     'load':31232
// }
//   setLoadConfirmationDoc(data1).then((d)=>{
//     console.log(d);
//   }).catch((err)=>{
//     console.log(err);
//   })


app.get("/", (req, res) => {
    res.send("i can hear you")
})

app.get('/data', (req, res) => {
    res.json({
        name: 'hemant',
        id: '212'
    })
})
let notimetestapihit = -1;

app.post('/login', (req, res) => {

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
    console.log('body : ', req.body);

    if (Token == undefined) {
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
    let created_by_id = "hemantsingh123"

    let { STREAM_api_key } = req.body;

    if (STREAM_api_key == undefined) {
        res.status(400).send("Request not have require field")
        return;
    }
    else if (STREAM_api_key == "z69d4mqmt5k9") {
        res.json({
            channel_id: channel_id,
            channel_type: channel_type,
            created_by_id: created_by_id
        })
        return;
    } else {
        res.status(401).send("Wrong Key");
        return;
    }
})

app.post('/signup', async (req, res) => {

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

app.put("/API/V1/load", async (req, res) => {

    let load = req.body;

    try {
        await setLoadConfirmationDoc(load).then((d) => {
            console.log(d);
            res.status(200).send("Added");
            return;
        }).catch((err) => {
            res.status(500).send("Data not added try again");
            return;
        })
    } catch {
        res.status(500).send("Not Added Try again");
        return;
    }
})

app.post("/API/V2/driverLog", async (req, res) => {

    let arr = [
        {
            DuserId: '98765',
            Dpassword: '12345',
            data:{
            stream_user_id: 'vinay',
            name:'vinay',
            stream_user_token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmluYXkifQ.hFlU_0C9GEGI8p5YED363oYHtxg1q2SfsOpO8z71FQY'
            }
       
        },
        {
            DuserId: '12345',
            Dpassword: '98765',
            data:{
            stream_user_id: 'rishabh',
            name:'rishabh',
            stream_user_token:
             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicmlzaGFiaCJ9.PxqrMz6BviQFy-ATkxq-IGVYZVa6pkcnruoj0IxdfkU'
            }
        }
    ]

    try {
        let { userId, password } = req.body;

        if (userId && password) {

            let loggedin=false;

          await arr.forEach(element => {   
                let DuserId=element.DuserId;
                let Dpassword=element.Dpassword;

                if (userId == DuserId && Dpassword == password) {
                    let data = {
                        message: 'user detected',
                        ...element.data
                        }
                         loggedin=true;
                    res.status(200).send(data);
                    return;
                }

            });

            if(!loggedin){
            res.status(401).send({"message":"Incorrect"});
            return;
            }
        }
        else {
            res.status(404).send({"message":"Not Found"})
        }
    } catch {
        res.status(404).send("Not Found")
    }
})

async function readdata() {
    let rawdata = fs.readFileSync(__dirname + '/DB/load.json');
    // let student = JSON.parse(rawdata);
    var array = rawdata.toString().split(",");

    console.log(array);
    for (let i = 0; i < 2; i++) {
        console.log(JSON.parse(array[i]));
    }
}

app.get("/getimg", async (req, res) => {
    let url = "https://ohio.stream-io-cdn.com/1206058/images/cbdae81d-d31f-4a3a-8204-61e9426e869e.download%20%282%29.jpeg?Key-Pair-Id=APKAIHG36VEWPDULE23Q&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9vaGlvLnN0cmVhbS1pby1jZG4uY29tLzEyMDYwNTgvaW1hZ2VzL2NiZGFlODFkLWQzMWYtNGEzYS04MjA0LTYxZTk0MjZlODY5ZS5kb3dubG9hZCUyMCUyODIlMjkuanBlZz8qb2g9MjU5Km93PTE5NCoiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2NjQ5MTY1OTN9fX1dfQ__&Signature=BkYHuwrcdrt4hgcOUfFx6Y7cY7mC~SeuE44ql8UhhRZc8pSqV90ruvVCdfFyRoM9GB6VTqzKZhY08phPRppPgC-uuh0jh7tDL7u79i95B784l4WuG~zP~VayDvO5GDCow~TVjckhykXKdXPAkCnpRbkrZ2fchWUemArFFVoWy-zYSGGJnE-Q2NbILe71Xf1fN~gAxfABLaAiSlp2PIcloZ-kMXRhPHRahlV8kevexBBwqeB1vXXl8Diw6pEZ7-PxZSLaBkDNDJSrADeY~9YxIpbCDkKMpmSH9ywOO0X-Mxsc1LY2ACWsZ2EQHlGSWdX~Pf0ZC7ZkiCJYcqJNhNvWRg__&oh=259&ow=194"

    res.send(url);

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

server.listen(Port, () => {
    console.log("server is running", Port);

})

io.on("connection", async (socket) => {
    console.log(socket.id);

    socket.emit("newconnect", {
       id:socket.id
    })

})