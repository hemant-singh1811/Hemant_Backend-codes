const express=require("express")

const app=express();

let Port=process.env.PORT  || 5000


// app.use(express.static(__dirname+'/public'))

app.get("/",(req,res)=>{
   res.json({
    name:"hemant",
    designation:"IT"
   })
})

app.listen(Port,()=>{
    console.log("server is running",Port);
})