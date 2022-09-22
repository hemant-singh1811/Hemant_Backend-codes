const {db,doc} =require("./db")

async function setLoadConfirmationDoc(data) {
    return new Promise(async function(resolve,reject){
        try{
            let loadnumber=23242;

            console.log('load : ',data.load_number);
            if(data.load_number){
                loadnumber=data.load_number;
            }
           console.log(loadnumber);
           
           let path='Load Confirmations/load'+loadnumber;

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

module.exports={
    setLoadConfirmationDoc
}