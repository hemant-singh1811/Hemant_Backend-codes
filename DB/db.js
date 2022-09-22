var admin = require("firebase-admin");
var serviceAccount = require(__dirname+'/serviceAccount.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://alphadatadb-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const { getFirestore,collection,getDoc,doc,query,where } =require('firebase/firestore');

console.log(collection);

const db=admin.firestore();

module.exports={
  db,
  doc
}



