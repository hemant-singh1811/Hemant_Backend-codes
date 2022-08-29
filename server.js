const express=require("express")

const app=express();

let Port=process.env.PORT  || 5000

app.get("/get",(req,res)=>{
res.send("hi this is / request to sever")
})

app.listen(Port,()=>{
    console.log("server is running",Port);
})