async function readdata() {
    let rawdata = fs.readFileSync(__dirname + '/DB/load.json');
    // let student = JSON.parse(rawdata);
    var array = rawdata.toString().split(",");

    console.log(array);
    for (let i = 0; i < 2; i++) {
        console.log(JSON.parse(array[i]));
    }
}