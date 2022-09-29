let express=require("express")
let router =express.Router();

let arr = [
    {
        DuserId: '98765',
        Dpassword: '12345',
        data:{
        stream_user_id: 'vinay',
        name:'vinay',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidmluYXkifQ.hFlU_0C9GEGI8p5YED363oYHtxg1q2SfsOpO8z71FQY',
        channel_id:'Load3123',
        channel_type:'messaging',
        chatinit:'true'
        }
   
    },
    {
        DuserId: '12345',
        Dpassword: '98765',
        data:{
        stream_user_id: 'rishabh',
        name:'rishabh',
        stream_user_token:
         'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoicmlzaGFiaCJ9.PxqrMz6BviQFy-ATkxq-IGVYZVa6pkcnruoj0IxdfkU'
        ,
        channel_id:'',
        channel_type:'',
        chatinit:'false'
        }
    }
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

    try {
        let { userId } = req.body; 
        if (userId) { 
            let loggedin=false;

          await arr.forEach(element => {   
                let DuserId=element.DuserId; 
                if (userId == DuserId  ) {
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
