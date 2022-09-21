const { firestore } = require("firebase-admin");
var admin = require("firebase-admin");
const { initializeApp } = require('firebase-admin/app');
const {getFirestore, Firestore}=require("firebase/firestore") 

const firebaseConfig = {
    apiKey: "AIzaSyC8HWT5gIMeEfxPJDkUo551WkpYTct8ZKg",
    authDomain: "alphadatadb.firebaseapp.com",
    projectId: "alphadatadb",
    storageBucket: "alphadatadb.appspot.com",
    messagingSenderId: "1044948495316",
    appId: "1:1044948495316:web:fcb8299e4ce588da94c441",

};

// const app = initializeApp(firebaseConfig);
// export declare function getFirestore(app?:App):Firestore;
admin.initializeApp(firebaseConfig);
var db = admin.firestore()

// console.log(db);


// let defaultAuth = getAuth(app1);
// let defaultDatabase = getDatabase(app1);

// const app= firebase.initializeApp(firebaseConfig)  

// const db=firebase.firestore();

const driver=db.collection("Driver")

console.log(driver);

let data={
    name:'hemant',
    company:'alphalion'
}


driver.add({data}).then((d)=>{
    console.log(d);
}).catch((er)=>{
    console.log(er);
})

// const colref=firestore.collection('Drivers')
// colref.add({foo: 'bar'}).then(documentReference => {
//     console.log(`Added document with name ${documentReference.id}`);
//   });

let documentRef = firestore.doc('Drivers/Alpha Lion');

documentRef.get().then(documentSnapshot => {
  if (documentSnapshot.exists) {
    console.log('Document retrieved successfully.');
  }
});



