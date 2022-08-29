const express=require("express")

const app=express();

let Port=process.env.PORT  || 5000


app.use(express.static(__dirname+'/public'))

app.listen(Port,()=>{
    console.log("server is running",Port);
})