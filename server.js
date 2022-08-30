const express=require("express")
const app=express();
const http=require("http");
const server=http.createServer(app);
const socket=require('socket.io');
const io=socket(server);

let idname = new Map();
let idtime = new Map();

let Port=process.env.PORT  || 5000

app.use("/",express.static(__dirname+'/public'))
 
app.get('/data',(req,res)=>{    
  res.json({
    name:'hemant',
    id:'212'
  })
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

    function online(self)
    {
        io.emit("OnUser",{
            onusers:getname(self)
        })
    }

    socket.on("register", (data) => {
        
        let username = data.username;
        
        console.log(idname.get("dasdas"));

        console.log('new user :', data.username);
        socket.join(username);
        idname.set(socket.id, username)
        let room = io.sockets.adapter.rooms

        online(username)
        console.log('room : ', room);
        //acknowledge will be send to client that we registerd 
    })

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

    socket.on("logout",(data)=>{

        let username=idname.get(socket.id);
        
        socket.leave(idname.get(socket.id))
        idname.delete(socket.id) 
        
        online(username)
    })

    socket.on('disconnect', () => {
        console.log('Disconnected : ', socket.id);

        let username=idname.get(socket.id);
        
        socket.leave(idname.get(socket.id))
        idname.delete(socket.id)
       console.log('idname : ',idname);
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

function getname(self){

    let value=[];

    const mapIter = idname.values();

    
let prev=mapIter.next();

while(prev.value!=undefined)
{
    if(prev.value!=self)
    value.push(prev.value)
    prev=mapIter.next()
}
return value;
}

server.listen(Port,()=>{
    console.log("server is running",Port);
})