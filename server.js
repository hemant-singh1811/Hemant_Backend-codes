const express = require("express")
require("dotenv").config()
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require('socket.io')
const io = socket(server, { cors: { origin: "*" } });
var bodyParser = require('body-parser');
const fs = require('fs');  
const webroutes=require('./API/webroute');
const approutes=require('./API/approute');
const sendload=require('./API/sendload');
const {getTime}=require("./helpers/serverhelper")

// console.log(process.env.STREAM_API_KEY);


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

let Port = process.env.PORT || 9900

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

app.use("/API/V1/",webroutes);

app.use("/API/V2/",approutes);

app.use("API/V2/",approutes)

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

io.on("connection", async (socket) => {
    console.log("socket id : ",socket.id);

    socket.emit("newconnect", {
       id:socket.id
    })

    socket.on("joinroom",(data)=>{
        try{
            socket.join(data.stream_user_id);
            socket.emit("channel joined","joined")
            console.log(data.stream_user_id,' join in channel');
        }catch{
            
        }
    });

    socket.on("disconnect", async() =>{
        console.log('disconnected : ',socket.id);
    })

    socket.on("reconnect", () => {
        console.log('reconnect : ',socket.id);
      });

})

let driver_user_id=[
    {
        driverid:'vinay',
        stream_user_id:'vinay'
    },
    {
        driverid:'rishabh',
        stream_user_id:'rishabh'
    },
    {
        driverid:'sumit',
        stream_user_id:'sumit'
    }
]

app.post("/sendload",async (req,res)=>{

 let driverid=req.body.driverid;
 let loadnumber=req.body.loadnumber;
 await io.to(element.stream_user_id).emit("assignload","test")
 try{
    let found=false;
    await getload(loadnumber).then(async (load)=>{
        await driver_user_id.forEach(async (element) => {
    
            if(element.driverid==driverid){
                found=true;
                console.log(element.stream_user_id);
            await io.to(element.stream_user_id).emit("assignload",load)
            return res.send("load sended to assign driver")
            }
        
         });
    }).catch((err)=>{
  return  res.status(404).send("load number not found");
    return;
    })
    if(!found)
    {
      return  res.status(404).send("driver id not found");
    }
 }catch{
   res.status(403).send("try again");
   return;
 }
}) 


server.listen(Port, () => {
    console.log("server is running", Port);

})
 