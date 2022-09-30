// Client side realtime 

const { initializeApp} =require('firebase/app');
let {getFirestore,collection,onSnapshot}=require('firebase/firestore')
 
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
const db = getFirestore(app); 

const doc1 = collection(db,'Load Confirmations')

const unsubscribe = onSnapshot(doc1, (snapshot) => { 

    snapshot.docChanges().forEach((change) => {

      if (change.type === "added") {
          console.log("New : ", change.doc.id);
      }
      if (change.type === "modified") {
          console.log("Modified : ", change.doc.id);
      }
      if (change.type === "removed") {
          console.log("Removed : ", change.doc.id);
      }
    });

  });

// const observer = doc1.onSnapshot(querySnapshot => {
//     querySnapshot.docChanges().forEach(change => {
//         if (change.type === 'added') {
//           console.log('New city: ', change.doc.data());
//         }
//         if (change.type === 'modified') {
//           console.log('Modified city: ', change.doc.data());
//         }
//         if (change.type === 'removed') {
//           console.log('Removed city: ', change.doc.data());
//         }
//       });

// //   console.log(docSnapshot); 
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });