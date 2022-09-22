const {db,doc} =require("./db")

async function setLoadConfirmationDoc(data) {
    return new Promise(async function(resolve,reject){
        try{
            let loadnumber=23242;

            if(data.loadnumber){
                loadnumber=data.loadnumber;
            }

            await db.doc('Load Confirmations/load'+loadnumber).set(data).then(res => {
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

module.exports={
    setLoadConfirmationDoc
}