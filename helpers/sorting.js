function Comparator(a, b) { 
    if(a.data.PU_date == undefined) return -1;

    if(a.data.PU_date==b.data.PU_date)
    {
        if(a.data.PU_time >=b.data.PU_time){
            return 1;
        }else return -1;
    }

    if(a.data.PU_date>b.data.PU_date) return 1;
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


function truckComparator(a,b){
    
    console.log(a.data.truckCurrentState.DEL_date);
    
    if(a.data.truckCurrentState.DEL_date==undefined) return 1;

    if(b.data.truckCurrentState.DEL_date == undefined) return -1;


    if(a.data.truckCurrentState.DEL_date==b.data.truckCurrentState.DEL_date){

         if(a.data.truckCurrentState.ETA == undefined) return 1;

         if(b.data.truckCurrentState.ETA == undefined) return -1;

        if(a.data.truckCurrentState.ETA >=b.data.truckCurrentState.ETA){
            return -1;
        }else return 1;
    }

    if(a.data.truckCurrentState.DEL_date>b.data.truckCurrentState.DEL_date) return 1;
    else return -1;

}

async function trucksort(arr){
    // console.log("hitted");
    return new Promise(async function (resolve, reject) {
        if(arr==undefined)
        {
        console.log("da");
         resolve(arr);
         return;   
        } 
        let aar = await arr.sort(truckComparator);
        // console.log('arr : ',arr);
        resolve(aar);
    })
}


module.exports={
    Comparator,
    sorted,
    trucksort
}


