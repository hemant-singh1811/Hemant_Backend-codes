const {db}=require('./db')

let document =  db.collection("channel").doc('23').get();

//check if it already exists or not

if (document && document.exists) {
    document.ref.update({
    updated: new Date().toISOString()
  });
}
else {
    let data={
        id: 12,
    name: 'hemant',
    email: 'email',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
}
    db.doc('channel/2344').set(data).then(res => {
        console.log("Document adeed succesfuly");
    }).catch(err => {
        console.log(err.message);
    })
 
}

