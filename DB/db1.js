var admin = require("firebase-admin");

var serviceAccount = require(__dirname+'/AlphaDatabase.json');


// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://alphadatabase-6609c-default-rtdb.asia-southeast1.firebasedatabase.app"
// });

 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alphadatabase-6609c-default-rtdb.asia-southeast1.firebasedatabase.app"
});



// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://alphadatadb-default-rtdb.asia-southeast1.firebasedatabase.app"
// });


const { getFirestore,collection,getDoc,doc,query,where } =require('firebase/firestore');
 
const db=admin.firestore();

module.exports={
  db,
  doc
}




