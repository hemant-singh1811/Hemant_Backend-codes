const {db,doc}=require("./db")
const {client}=require("./../Stream/user")

async function removeallsubcolletion(collection){

    const citiesRef = db.collection(collection);

    const snapshot = await citiesRef.get();
    
    snapshot.forEach(async doc => {
      console.log(doc.id, '=>', doc.id);
    
    const res = await db.collection('Stream-users').doc(doc.id).delete();
    });
}

async function channelcreate(){

   let members=['sumit','vinay'];

    const channel = await client.channel('messaging', {
        members: members,
        created_by_id:'hemant'
    });

    await channel.create()
}

channelcreate().then((data)=>{
    console.log(data.Channel.cid);
});
