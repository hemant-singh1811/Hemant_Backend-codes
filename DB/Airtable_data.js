var Airtable = require('airtable'); 
var base = new Airtable({apiKey: 'keyHJklfBm0hHBW48'}).base('app16x5q6jE2uqjB9');

// base('Drivers - Sync').find('recH4tOhABcD0aBzn', function(err, record,fetchNextPage) {
//     if (err) { console.error(err); return; }
 
//    fs.writeFile('Driver-Sync.json', JSON.stringify(record), function (err) {
//         if (err) return console.log(err);
//         console.log('Hello World > helloworld.txt');
//       });

//     console.log('Retrieved', record.id);
// });


// base('Trucks - Sync').find('rec3gsRmndKvBUn3V', function(err, record) {
//     if (err) { console.error(err); return; }
//     fs.writeFile('Truck-Sync.json', JSON.stringify(record), function (err) {
//         if (err) return console.log(err);
//       });
//     // console.log('Retrieved', record.id);
// });


 let i=1;

 
async function driver(){

  base('Drivers - Sync').select({
    // Selecting the first 3 records in Alpha Lion: 
    // view:'Brokerage'
}).eachPage(function page(records, fetchNextPage) {
    // This function (`page`) will get called for each page of records.

    records.forEach(function(record) {
        console.log('Retrieved',i, record.get('Status'));
        i++;
    // fs.appendFile('Drivers5-Sync.json', JSON.stringify(record), function (err) {
    //   if (err) return console.log(err); 
    // });
  });

    // To fetch the next page of records, call `fetchNextPage`.
    // If there are more records, `page` will get called again.
    // If there are no more records, `done` will get called.
    fetchNextPage();

}, function done(err) {
    if (err) { console.error(err); return; }
});
}


async function master(){
  
  base('Master').select({   
  }).eachPage(function page(records, fetchNextPage) {
  
        records.forEach(function(record) {
          if(i==10)
        console.log('Retrieved',i, record);
        i++;
        })
      })
}

master()