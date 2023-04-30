const universeId = 2332891023;
const namespace = "Percentile";
const key = "Dataset";

fetch(`https://data.roproxy.com/datastore/get-json?universeId=${universeId}&namespace=${namespace}&key=${key}`)
  .then(response => response.json())
  .then(data => {
    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `Datastore value: ${data}`;
  })
  .catch(error => {
    console.error(error);
  });

