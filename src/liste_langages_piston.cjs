const axios = require('axios');

axios.get('https://emkc.org/api/v2/piston/runtimes')
  .then(response => {
    const runtimes = response.data;
    runtimes.forEach(runtime => {
      console.log(`Language: ${runtime.language}, Version: ${runtime.version}`);
    });
  })
  .catch(error => {
    console.error('Error fetching runtimes:', error);
  });