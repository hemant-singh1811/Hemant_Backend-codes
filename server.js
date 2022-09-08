const express = require("express")
const app = express();
const http = require("http");
const server = http.createServer(app);
const socket = require('socket.io')
const io = socket(server);
const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');

const cors = require('cors');
const { json } = require("express");

let idname = new Map();
let idtime = new Map();

 
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


let Port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(json())
app.use("/", express.static(__dirname + '/public'))

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

    let channel_id = 'messaging:212334driver'
    let channel_name = "212334driver"

    let { STREAM_api_key } = req.body;
 
    if(STREAM_api_key==undefined){
        res.status(400).send("Request not have require field")
        return;
    }
   else if (STREAM_api_key == "z69d4mqmt5k9") {
          res.json({
             channel_id: channel_id,
             channel_name: channel_name
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

app.put("/putreq", (req, res) => {

    res.sendStatus(100);

    // res.sesend("Data Added")


})

function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    console.log('Now : ', time);
    return time;
}

io.on('connection', (socket) => {
    console.log('Added : ', socket.id);
    // console.log(socket); 
    idtime.set(socket.id, getTime());

    io.emit('getback');

    socket.emit("new", {
        id: "/ : " + socket.id
    })
    function online(self) {
        io.emit("OnUser", {
            onusers: getname(self)
        })
    }

    socket.on("register", async (data) => {
        let duplicate = false;
        let username = data.username;
        duplicate = await checkifalreadyexist(username)

        socket.emit("wronguser", {
            duplicate: duplicate
        })

        if (duplicate == false) {
            console.log('new user :', username);
            socket.join(username);
            idname.set(socket.id, username)
            let room = io.sockets.adapter.rooms

            online(username)
            console.log('room : ', room);
        }
        //acknowledge will be send to client that we registerd 
    })

    function checkifalreadyexist(username) {

    }

    socket.on('msg_send', (data) => {
        console.log('msg_send socket call');
        let message = data.msg;
        let from = data.from;
        let to = data.to;

        console.log('message : ', message);
        console.log('from : ', from);
        console.log('to : ', to);

        //lets send the message to corresponding sender.

        if (to != "") {
            io.to(to).emit('msg_rcd', {
                message: message,
                from: from,
                to: to
            })
        } else {
            socket.broadcast.emit("msg_rcd", {
                message: message,
                from: from
            })
        }
    })

    socket.on("logout", (data) => {

        let username = idname.get(socket.id);

        socket.leave(idname.get(socket.id))
        idname.delete(socket.id)

        online(username)
    })

    socket.on('disconnect', () => {
        console.log('Disconnected : ', socket.id);

        let username = idname.get(socket.id);

        socket.leave(idname.get(socket.id))
        idname.delete(socket.id)
        console.log('idname : ', idname);
        let room = io.sockets.adapter.rooms

        console.log('room : ', room);
        // diff(getTime(), idtime.get(socket.id))

        // console.log('discoonection time : ');

        online(username)

    })

    socket.on("send", (data) => {
        io.send('msg_rcd', {
            msg: data.msg
        })
    })

    socket.on('online', (data) => {
        let user = data.user;
        let pass = data.pass;
        io.emit('online_user', {
            rcd: 'true'
        })
    })

    socket.on('socket', () => {
        console.log(socket.id);
    })

    //    socket.once('once',()=>{
    //     console.log('once : ',socket.id);
    //    })

    let listener = () => {
        console.log('off propertry');
    }

    socket.on('off', listener)

    socket.on('setoff', () => {
        console.log('set off is called');
        socket.off("off", listener)
    })

    socket.on("details", () => {
        console.log('empty');
    })

    socket.on("details", (data) => {
        console.log('with data');
    })

    // let listener1=('onAny',data)=>{

    // }

    // socket.onAny(listener1);

    // console.log('socket rooms : ',socket.rooms);

});

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