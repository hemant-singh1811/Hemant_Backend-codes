const express=require("express")
const app=express();
const http=require("http");
const server=http.createServer(app);
const socket=require('socket.io');
const io=socket(server);

let Port=process.env.PORT  || 5000

app.use("/chat",express.static(__dirname+'/public'))

app.get("/",(req,res)=>{
   res.json({
    name:"hemant",
    designation:"IT"
   })
})

app.post('/',(req,res)=>{
   res.send("post data")
})

io.on("connection",(socket)=>{
    console.log("new connection :",socket.id);
    socket.emit("newuser",{
        id:socket.id
    });
})

server.listen(Port,()=>{
    console.log("server is running",Port);
})