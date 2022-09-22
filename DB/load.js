const {db,doc} =require("./db")

async function setLoadConfirmationDoc(data) {
    return new Promise(async function(resolve,reject){
        await db.doc('Load Confirmations/hemantKAload').set(data).then(res => {
            resolve("Document adeed succesfuly");
        }).catch(err => {
            reject(err.message);
        })
    })
    // console.log("adding load to DB function");
    // Add a new document in collection "Load Confirmations" with ID 'hemantKAload'
   
}

module.exports={
    setLoadConfirmationDoc
}