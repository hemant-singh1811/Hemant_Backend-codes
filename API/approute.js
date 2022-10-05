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
    },
    {
        DuserId: '56789',
        Dpassword: '54321',
        data:{
        stream_user_id: 'hemant',
        name:'hemant',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiaGVtYW50In0.jRr6eK6u2--pwvEUEzdTjmrZhsFJBqWXfws914TTBNw',
             channel_id:'Sample',
        channel_type:'messaging',
        chatinit:'true'
        }
   
    },
    {
        
        DuserId: '12121',
        Dpassword: '54566',
        data:{
        stream_user_id: 'gurbani',
        name:'gurbani',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZ3VyYmFuaSJ9.9NglJFAapynWDuQCOWMrZrEfWA7N5CQ7E_Z2VWIGgB4',
            channel_id:'Sample',
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
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFuaXNoIn0.frtlSB6GZOl_Iyt87i1kVC7seGcAAnBCWzqq_PVL6hE',
            channel_id:'Sample2',
        channel_type:'messaging',
        chatinit:'true'
        }
    },
    {
        DuserId: '432413',
        Dpassword: '76765',
        data:{
        stream_user_id: 'Abhay',
        name:'Abhay',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQWJoYXkifQ.3ZsREynI8_nXaf4qjqB2pcG8_jBrHqCqjbsHRnbnPTQ',
            channel_id:'',
        channel_type:'',
        chatinit:'true'
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
