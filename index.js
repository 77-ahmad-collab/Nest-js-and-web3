const axios = require('axios');
const run = async () => {
  const number = 32;
  const result = await axios.get(`http://localhost:7000/ahmad/${number}`);
  console.log(result.data);
};
run();
