let socket=io();

socket.on("newuser",(data)=>{
    console.log("server socket id: ",data.id);
})