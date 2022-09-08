const axios = require('axios');

axios
  .post('https://sampleserver1.herokuapp.com/getchannel', {
        "STREAM_api_key":"z69d4mqmt5k9"
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`);
    console.log(res.data);
  })
  .catch(error => {
    console.error(error);
  });
