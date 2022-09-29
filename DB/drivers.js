const {db} = require('./db')
const {insertuser,client}=require("../Stream/user")
const crypto=require("crypto")


let name=['rishabh','vinay','sumit','hemant','gurbani','manish','jay','gurpreet']
let All=[];

async function createstreamid(){

const driverlogin= db.collection("Stream-users").doc('23').get();


if (driverlogin && driverlogin.exists) {
    driverlogin.ref.update({
    updated: new Date().toISOString()
  });
}
else {
name.forEach(async element => {
    
    const userId =await crypto.randomBytes(6).toString('hex');
    
    await insertuser(element,userId)

    let token = await client.createToken(element);
  
    // console.log(userId," pwd : ",token);
    
    let data={
        user_id:userId,
        user_password:'1seattle',
       
        data:{ Stream_id:userId,
        name:element,
        Stream_token:token,
       },

       created: new Date().toISOString(),
        updated: new Date().toISOString()
    }

    db.doc("Stream-users/"+userId).set(data).then(res =>{

        console.log("Document adeed succesfuly");
    }).catch(err => {
        console.log('err');
    }) 

});
}
}

