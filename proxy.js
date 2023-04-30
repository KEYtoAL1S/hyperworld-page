const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3000; // choose any available port

app.get('/data', async (req, res) => {
  try {
    const universeId = 2332891023;
    const namespace = "Percentile";
    const key = "Dataset";
    const url = `https://data.roblox.com/datastore/get-json?universeId=${universeId}&namespace=${namespace}&key=${key}`;
    const response = await fetch(url);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
