let express=require("express")
let router =express.Router();

let arr = [
    {
        DuserId: '98765',
        Dpassword: '12345',
        data:{
        stream_user_id: 'Vinay',
        name:'Vinay',
        stream_user_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiVmluYXkifQ.M3HOWUKZz0BQxuPzTOI_qC0uBnkndwIyU4i-G3eZs5E',
        channel_id:'Load1097121',
        channel_type:'messaging',
        chatinit:'true'
        }
   
    },
    {
        DuserId: '12345',
        Dpassword: '98765',
        data:{
        stream_user_id: 'Rishabh',
        name:'Rishabh',
        stream_user_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUmlzaGFiaCJ9.qoMEHcAVso3QO7jCuXRRWReuay_qHJae_QUsQ_ktY3g',
          channel_id:'Load9798144',
        channel_type:'messaging',
        chatinit:'true'
        }
    },
    {
        DuserId: '56789',
        Dpassword: '54321',
        data:{
        stream_user_id: 'Gurbani',
        name:'Gurbani',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiR3VyYmFuaSJ9.7sYMG23JQ7BopTZY7IssA2PV_1lrIjVNnPs8RCuyASQ',
            channel_id:'Load7110144',
        channel_type:'messaging',
        chatinit:'true'
        }
   
    },
    {
        DuserId: '908987',
        Dpassword: '765788',
        data:{
        stream_user_id: 'Manish',
        name:'Manish',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFuaXNoIn0.bzkXpCdV7VBWAaHG7ZiLdiOYjw0APsykQmWwYFmLtgI',
            channel_id:'Load5115104',
        channel_type:'messaging',
        chatinit:'true'
        }
    },
    
]

router.post("/driverLog",async (req,res)=>{
   
    try {
        let { userId, password } = req.body; 
        if (userId && password) { 
            let loggedin=false;

          await arr.forEach(element => {   
                let DuserId=element.DuserId;
                let Dpassword=element.Dpassword; 
                if (userId == DuserId && Dpassword == password) {
                    let data = {
                        message: 'user detected',
                        ...element.data
                        }
                         loggedin=true; 
                    res.status(200).send(data);
                    return;
                }
            }); 
            if(!loggedin){ 
            res.status(400).send({"message":"Incorrect"});
            return;
            }
        }
        else {
            res.status(404).send({"message":"Not Found"})
            return;
        }
    } catch {
        res.status(404).send({"message":"Not Found"})
        return;
    }
})

router.post("/getassignchannel",async (req,res)=>{

    console.log("getassignchannel");
    
    try {
        let { userId } = req.body; 
        if (userId) { 
            let loggedin=false;

          await arr.forEach(element => {   
                let DuserId=element.DuserId; 
                if (userId == DuserId) {
                    let data = {
                        message: 'user detected',
                        channel_id: element.data.channel_id,
                        channel_type: element.data.channel_type,
                        } 
                    loggedin=true;  
                    res.status(200).send(data);
                    return;
                }
            }); 
            if(!loggedin){ 
              res.status(400).send({"message":"Incorrect"});
            return;
            }
        }
        else {
            res.status(404).send({"message":"Not Found"})
            return;
        }
    } catch {
        res.status(404).send({"message":"Not Found"})
        return;
    }
})

module.exports=router;
