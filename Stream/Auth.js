require("dotenv").config({path:"./../.env"})

const StreamChat = require('stream-chat').StreamChat;

let STREAM_APP_ID=process.env.STREAM_APP_ID
let STREAM_API_KEY=process.env.STREAM_API_KEY
let STREAM_API_SECRET=process.env.STREAM_API_SECRET
let Channel_Type = process.env.Channel_type;
let Channel_Id = process.env.Channel_id;

let client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

module.exports={
    client,
    STREAM_APP_ID,
    STREAM_API_KEY,
    STREAM_API_SECRET,
    Channel_Type,
    Channel_Id
}