//server side realtime data reads
const {db}=require('./db1')

const doc1 = db.collection('LoadEntry')
const truckdb=db.collection('Trucks');

// const observer = doc1.onSnapshot(querySnapshot => {
// querySnapshot.docChanges().forEach(change => {
//         //triggered when new data added
//         if (change.type === 'added') {
//             // let arr=change.doc.data();
//  console.log('New id : ', change.doc.id);
//           // console.log('New city: ', arr,"size : "+Object.keys(arr).length);
//         }
//         //triggered when any data updates
//         if (change.type === 'modified') {
//           console.log('Modified doc. : ', change.doc.id);
//           // console.log('Modified city: ', change.doc.data());
//         }
//         //triggered when any data have been removed
//         if (change.type === 'removed') {
//           console.log('Removed : ', change.doc.id);
//           // console.log('Removed city: ', change.doc.data());
//         }
// });

//   console.log(docSnapshot); 
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });

module.exports={
  doc1,
  truckdb,
db
}