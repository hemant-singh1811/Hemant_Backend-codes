function Comparator(a, b) { 
    if(a.data.PU_date == undefined) return -1;

    if(a.data.PU_date>= b.data.PU_date) return 1;
    else return -1;

}

async function sorted(arr) {
    return new Promise(async function (resolve, reject) {
        if(arr==undefined)
        {
        console.log("da");
         resolve(arr);
         return;   
        } 
        let aar = await arr.sort(Comparator);
        resolve(aar);
    })
}

module.exports={
    Comparator,
    sorted
}