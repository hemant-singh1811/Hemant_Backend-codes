// Client side realtime 
const { initializeApp} =require('firebase/app');
let {getFirestore,collection,onSnapshot}=require('firebase/firestore');

 
// const firebaseConfig = {
  
//     apiKey: "AIzaSyC8HWT5gIMeEfxPJDkUo551WkpYTct8ZKg",
//     authDomain: "alphadatadb.firebaseapp.com",
//     databaseURL: "https://alphadatadb-default-rtdb.asia-southeast1.firebasedatabase.app",
//     projectId: "alphadatadb",
//     storageBucket: "alphadatadb.appspot.com",
//     messagingSenderId: "1044948495316",
//     appId: "1:1044948495316:web:fcb8299e4ce588da94c441"
// };

const firebaseConfig = {
    apiKey: "AIzaSyCRkhlbj_PqiOzLnNUK43eTA9B29vBCATA",
    authDomain: "alphadatabase-6609c.firebaseapp.com",
    databaseURL: "https://alphadatabase-6609c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "alphadatabase-6609c",
    storageBucket: "alphadatabase-6609c.appspot.com",
    messagingSenderId: "1019230094129",
    appId: "1:1019230094129:web:8e28da4615a0c086b7a610"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 


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


const doc12 = collection(db,'LoadEntries')

const unsubscribe = onSnapshot(doc12, (snapshot) => { 
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
          console.log("New id : ", change.doc.id);
      }
      if (change.type === "modified") {
          console.log("Modified id : ", change.doc.id);
      }
      if (change.type === "removed") {
          console.log("Removed id : ", change.doc.id);
      }
    });
});
