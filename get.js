fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`) // get
  .then(response => response.json())
  .then(data => {
    const resultElement = document.getElementById("visits");
    resultElement.innerHTML = `${data.visits}` + ' Visits'; // ??
  })
  .catch(error => {
    console.error(error);
  });

