// const StreamChat = require('stream-chat').StreamChat;
// const path=require("path")
// // const {name,STREAM_APP_ID,STREAM_API_KEY,STREAM_API_SECRET}=require('../env')
// // path.dirname('/Users/hemantsingh/code/host/')
// // require("dotenv").config({ path: '/Users/hemantsingh/code/host/'+'.env'}) 
// // console.log(require('../server')); 
// // console.log(__filename);


// // console.log(fs);
 
// let STREAM_APP_ID=process.env.STREAM_APP_ID
// let STREAM_API_KEY=process.env.STREAM_API_KEY
// let STREAM_API_SECRET=process.env.STREAM_API_SECRET

// // console.log(STREAM_API_KEY);
// // console.log(STREAM_API_SECRET); 

// let client = StreamChat.getInstance(STREAM_API_KEY, STREAM_API_SECRET);

// let user_id='Gurpreet_Marok_31d85a4f-27fe-4b3b-a77a-b2ea7766705e';
// let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiR3VycHJlZXRfTWFyb2tfMzFkODVhNGYtMjdmZS00YjNiLWE3N2EtYjJlYTc3NjY3MDVlIn0.tp-GsJ3ie018YXvLLgP344OlpVFTPwNUgnAs5rZ8_m4'
 
// async function insertuser(name,user_id){  
//     const user = await client.upsertUser({ 
//         id: user_id, 
//         role: 'user',  
//         name: name, 
//         book:"dune"
//      });
// }

// // insertuser("Abhay",'925e5224').then((data)=>{
// //     console.log('data');
// // }).catch((err)=>{
// //     console.log(err)
// // })

// module.exports={
//     client,
//     insertuser
// }