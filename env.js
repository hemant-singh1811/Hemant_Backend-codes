require("dotenv").config();

let STREAM_APP_ID=process.env.STREAM_APP_ID
let STREAM_API_KEY=process.env.STREAM_API_KEY
let STREAM_API_SECRET=process.env.STREAM_API_SECRET

let name="hemant"
module.exports={  
    STREAM_APP_ID ,
    STREAM_API_KEY ,
    STREAM_API_SECRET,
    name
}