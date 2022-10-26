const { initializeApp } =require("firebase/app");
const {getStorage} =require("firebase/storage")
 
 
const firebaseConfig = {
  apiKey: "AIzaSyC8HWT5gIMeEfxPJDkUo551WkpYTct8ZKg",
  authDomain: "alphadatadb.firebaseapp.com",
  databaseURL: "https://alphadatadb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "alphadatadb",
  storageBucket: "alphadatadb.appspot.com",
  messagingSenderId: "1044948495316",
  appId: "1:1044948495316:web:fcb8299e4ce588da94c441"
};
 
const app = initializeApp(firebaseConfig);

 const storage=getStorage(app);

module.exports= {storage}
