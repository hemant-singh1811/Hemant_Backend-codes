const {db,doc} =require("./db")

async function read(){
   
    const citiesRef = db.collection('Stream-users');

    const snapshot = await citiesRef.get();
    
    snapshot.forEach(doc => {
      console.log('load_number : ',doc.data());
    }); 

}

read()