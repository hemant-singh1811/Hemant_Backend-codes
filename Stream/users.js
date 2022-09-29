const { client, Channel_Id, Channel_Type } = require('./Auth.js')

async function createuser(userID) {
    //upsert means create and update user

    const updateResponse = await client.upsertUser({
        id: userID,
        role: 'admin',
        book: 'dune'
    });

}

async function createToken(user_id) {
    let token = await client.createToken(user_id);

    return token
}

//Adduser > if user not exits then gives error otherwise work fine

async function adduser(Channel_Id, Channel_Type, user_id) {
    return new Promise(async function (resolve, reject) {
        let channel = await client.channel(Channel_Type, Channel_Id);

        await channel.addMembers([user_id]).then((data) => {
            resolve("Added");
        }).catch((err) => {
            reject(err)
        })
    })
}

async function addusers(Channel_Id, Channel_Type, user_ids) {
    return new Promise(async function (resolve, reject) {
        let channel = await client.channel(Channel_Type, Channel_Id);

        await channel.addMembers(user_ids).then((data) => {
            resolve("Added");
        }).catch((err) => {
            reject(err)
        })
    })
}

// removeuser > if user not exits then gives error otherwise work fine

async function removemember(Channel_Id, Channel_Type, user_id) {
    return new Promise(async function (resolve, reject) {
        let channel = await client.channel(Channel_Type, Channel_Id);

        await channel.removeMembers([user_id]).then((data) => {
            resolve("Removed");
        }).catch((err) => {
            reject(err)
        })
    })
}

async function removemembers(Channel_Id, Channel_Type, user_ids) {
    return new Promise(async function (resolve, reject) {
        let channel = await client.channel(Channel_Type, Channel_Id);

        await channel.removeMembers(user_ids).then((data) => {
            resolve("Removed");
        }).catch((err) => {
            reject(err)
        })
    })
}


// adduser(Channel_Id, Channel_Type, 'sumit').then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log('err');
// })

// let arr=['9b862d57cda7','fab44f67063b'];

// addusers(Channel_Id, Channel_Type, arr).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

// removemember(Channel_Id, Channel_Type, 'sumit').then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log('err');
// })

// removemembers(Channel_Id, Channel_Type, arr).then((data) => {
//     console.log(data);
// }).catch((err) => {
//     console.log(err);
// })

// Add user to the channel with role set
// await channel.addMembers([{user_id:"james_bond", channel_role:"channel_moderator"}]);


async function disconnect() {
    await client.disconnectUser();
}

async function deactivateuser(userID) {
    const deactivate = await client.deactivateUser(userID);

    const deactivate1 = await client.deactivateUser(userID, {
        mark_messages_deleted: true,
        created_by_id: "god",
    });
}

async function reactivateuser(userID) {
    const reactivate = await client.reactivateUser(userID);

    const reactivate1 = await client.reactivateUser(userID, {
        restore_messages: true,
        name: "I am back",
        created_by_id: "god",
    });

}



module.exports = {
    createToken,
    adduser,
    addusers,
    removemember,
    removemembers
}