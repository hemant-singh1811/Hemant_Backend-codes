const {db,doc} =require("./db1")

// Load Database operations 


// setLoadConfirmation data adding to database

async function setLoadConfirmationDoc(data) {
    return new Promise(async function(resolve,reject){
        try{
            let loadnumber=23242;

            console.log('load : ',data.load_number);
            if(data.load_number){
                loadnumber=data.load_number;
            }
           console.log(loadnumber);

           let path='LoadEntry/'+loadnumber;

            await db.doc(path).set(data).then(res => {
                resolve("Document adeed succesfuly");
            }).catch(err => {
                reject(err.message);
            })
        }catch{
            reject('error');
        }
        
    })
    // Add a new document in collection "Load Confirmations" with ID 'hemantKAload'
}

// setting driver data to database

async function setDr(data) {
    return new Promise(async function(resolve,reject){
        try{
            let loadnumber=23242;

            console.log('load : ',data.load_number);
            if(data.load_number){
                loadnumber=data.load_number;
            }
           console.log(loadnumber);

           let path='Drivers/'+loadnumber;

            await db.doc(path).set(data).then(res => {
                resolve("Document adeed succesfuly");
            }).catch(err => {
                reject(err.message);
            })
        }catch{
            reject('error');
        }
        
    })
    // Add a new document in collection "Load Confirmations" with ID 'hemantKAload'
}

//get data of a particular collection from database

async function read(){
   
    const citiesRef = db.collection('Load Confirmations');

    const snapshot = await citiesRef.get();
    
    snapshot.forEach(doc => {
    //   console.log(doc.id, '=>', doc.data());
      console.log('load_number : ',doc.data().load_number);
    }); 

}
 


// get the particular load from database

async function getload(load_number){
    console.log("load : ",load_number);
    return new Promise(async function(resolve,reject){
        const citiesRef =await db.collection('LoadEntry');
    
        const snapshot = await citiesRef.get();
        
         await snapshot.forEach(doc => { 
          let LoadNumber=doc.data().load_number;  
          if(LoadNumber==load_number){ 
              resolve(doc.data()); 
          }

        })
        reject("load not Found") 
    })
       
}

// getload(43322).then((data)=>{
//     console.log(data);
// }).catch((err)=>{
//     console.log(err);
// })


async function listCollections(){
    db.listCollections()
  .then(snapshot=>{
      snapshot.forEach(snaps => {
        console.log(snaps["_queryOptions"].collectionId); // LIST OF ALL COLLECTIONS
      })
  })
  .catch(error => console.error(error));
}

// listCollections();


module.exports={
    setLoadConfirmationDoc,
    getload
}