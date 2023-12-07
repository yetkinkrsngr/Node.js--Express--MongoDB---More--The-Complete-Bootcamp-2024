const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/v1/tours', async (req, res) => {
  const tours = await axios.get('http://localhost:3000/api/v1/tours');
  res.send(tours.data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
