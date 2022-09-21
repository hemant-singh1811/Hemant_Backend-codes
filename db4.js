import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const { initializeApp } = require('firebase/app')

const { getFirestore, collection, getDoc, doc, getDocs } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyC8HWT5gIMeEfxPJDkUo551WkpYTct8ZKg",
    authDomain: "alphadatadb.firebaseapp.com",
    projectId: "alphadatadb",
    storageBucket: "alphadatadb.appspot.com",
    messagingSenderId: "1044948495316",
    appId: "1:1044948495316:web:fcb8299e4ce588da94c441"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

async function getCities() {
    const docRef = doc(db, "Drivers");

    const docSnap = await getDocs(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
    } else {
        console.log("No such document!");
    }
}

// getCities()

async function getRC() {

    console.log("coming in get RC function");
  //   "Load Confirmations", "5209-00"
  
  const load="5209-00";
  const docRef = doc(db,`Load Confirmations/${load}`);
  
  //called the getDoc to get data of above document reference
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
  
}
   
  getRC()

  module.exports={
    getRC
  }