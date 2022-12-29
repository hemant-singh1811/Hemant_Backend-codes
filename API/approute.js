let express=require("express")
let router =express.Router();
const requestIp = require('request-ip')
const {db} = require("..//DB/realtime")


// data storing 

let arr = [
    {
        DuserId: '98765',
        Dpassword: '12345',
        data:{
        stream_user_id: 'Raghav',
        name:'Raghav',
        stream_user_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUmFnaGF2In0.04qxeIH08cAaKZLNZWP3tVHCXFISjwRheHIa90Y5QQY',
        channel_id:'Load1097121',
        channel_type:'messaging',
        chatinit:'true'
        }
   
    },
    {
        DuserId: '12345',
        Dpassword: '98765',
        data:{
        stream_user_id: 'Aman',
        name:'Aman',
        stream_user_token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQW1hbiJ9.qZnvnAVQNWRCoSn4N2KcsihgpRuETTSHT1P7VfSE-Gg',
          channel_id:'Load9798144',
        channel_type:'messaging',
        chatinit:'true'
        }
    },
    {
        DuserId: '56789',
        Dpassword: '54321',
        data:{
        stream_user_id: 'Mahesh',
        name:'Mahesh',
        stream_user_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiTWFoZXNoIn0._zDNmVrWgjiWYAlgPdB28hFnSKBc67mFH-c84NGNMMw',
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

// API for driver app login 

router.post("/driverLog",async (req,res)=>{
   
    try {
        let { userId, password } = req.body;
        var clientIp = requestIp.getClientIp(req) 
        console.log("driver is try to login");
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
                        console.log("logged as : ",element.data.name);
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

// API for geeting the assign channel (group)

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

// API for getting current dispatch

router.post("/GetCurrDispatch",async (req,res)=>{

    console.log("/getDispatch");

    try {
        
    let user_token=req.body.user_token;

    let data={
            receiver_city: 'Phoenix',
            Load_type: 'Team',
            id: 'rec6YsHq8gNS1bdNP',
            PU_Date: '2022-12-22',
            shipper_city: [ 'Portland' ],
            shipperData: {
              FullAddress: 'Peak Annex - Portland\n5220 N Basin Ave\nPortland, OR 97217',
              Zip: '97217',
              Name: 'Peak Annex - Portland',
              city: 'Portland'
            },
            shiper_zip: [ '97217' ],
            drop_type: 'Live - Appt',
            load_number: '33142',
            receiverData: {
              Name: 'West Valley P&DC - Phoenix',
              city: 'Phoenix',
              Zip: '85043',
              FullAddress: 'West Valley P&DC - Phoenix\n620  N 47th Ave\nPhoenix, AZ 85043'
            },
            shipper_state: [ 'OR' ],
            load_status: 'In Transit ',
            carrier_MC: [ '1203541' ],
            receiver_zip: [ '85043' ],
            PU_time: '10:30',
            trailer_id: [ 'recZyur1C0Mvh1JGZ' ],
            lane: 'OR > AZ',
            shipper_id: [ 'reccOINqhr7e2NGbn' ],
            dispatch: 28338,
            truck_id: [ 'rec2SVYCxLqOqY57g' ],
            receiverType: 'Live - Appt',
            receiver_id: [ 'recPXR6lBTjM1bwKm' ],
            DEL_time: '18:45',
            DEL_Date: '2022-12-22',
            receiver_address: [ '620  N 47th Ave' ],
            ship_type: 'Live - Appt',
            receiver_state: [ 'AZ' ],
            truck_name: [ 'B - 1322 - Harman freight' ],
            PU_status: 'Late Pickup ❌ ',
            client_id: [ 'recIV837MTikNtcd1' ],
            shipper_address: [ '5230 N Basin Ave' ],
            carrier_name: [ 'Harman Freight Inc' ]
          }
    
    let data1={

        Load_type: "Team",

        ship_type: "Drop - FCFS ",
        shipper_state: "CA",
        shipper_address:"4466 Pock Lane",
        PU_Date: "2022-12-23",
        shipperData: {
            "Name": "Tri-West LTD - Stockton",
            "FullAddress": "Tri-West LTD - Stockton\n4466 Pock Lane\nStockton, CA 95206",
            "city": "Stockton",
            "Zip": "95206"
        },

        drop_type: "Live - Appt",
        receiver_state:"OR",
        receiver_address:"15670 N Lombard Street ",
        DEL_Date: "2022-12-27",
        receiverData: {
            "city": "Portland",
            "Name": "Tyler Union - Portland",
            "FullAddress": "Tyler Union - Portland\n15670 N Lombard Street \nPortland, OR 97203",
            "Zip": "97203"
        },
        
        pickupno:"21342423",
        checkin:"Alpha Lion Logistics",
        customerName: "BLUE GRACE GROUP",

    }

    res.send(data);

    // const citiesRef = db.collection('UserLogins');

    // const snapshot = await citiesRef.get();
    // let data1=[]; 

    // await snapshot.forEach(doc => { 
      
    //    let obj={
    //        id:doc.id,
    //        data:doc.data()
    //       }

    //       data1.push(obj)  
    // });  

    // res.send(data1);

    } catch(e) {    

        let data={
            "message":"user_token not found"
            }

            res.send(data)
    }
})

// get driver history function to getting the data the from database

async function getDriverHistory()
{
  let id="rec4Ey46WRbaMJDQW";
  const doc=await db.collection('allLoadHistory').where("Driver A",'array-contains',`${id}`).get();

  let data=[];

 await doc.forEach(d=>{
    console.log("PAST LOAD DTA",d.data());
    // const dfd=d.data();
    // res={...res,dfd};
    data.push(d.data())
  })
   return data;
}


//API for Loadhistory

router.post("/Loadhistory",async (req,res)=>{

    // const citiesRef = db.collection('MasterLoad');

    try{
        let user_token=req.body.user_token;

        let data=await getDriverHistory();

        res.send(data);

    }catch(e){

        let data={
            "message":"user_token not found"
            }   

            res.send(data);
    }

    // const snapshot = await citiesRef.get();
    // let data1=[]; 

    // await snapshot.forEach(doc => {  
    //    let obj={
    //        id:doc.id,
    //        data:doc.data()
    //       }
    //       data1.push(obj)  
    // });  

    // res.send(data1);

})

module.exports=router;
