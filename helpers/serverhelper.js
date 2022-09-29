function getTime() {
    var today = new Date();

    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    console.log('Now : ', time);
    return time;
}



module.exports={
    getTime
}