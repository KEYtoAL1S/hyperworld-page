fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`) // get game data
  .then(response => response.json())
  .then(tab => {
    const resultElement_visit = document.getElementById("visits");
    const resultElement_favorite = document.getElementById("fav");
    const resultElement_playing = document.getElementById("playing");
    
    const gameData = tab.data[0]; // Assuming that we want to display data for the first game in the array
    
    resultElement_visit.innerHTML = `${gameData.visits.toLocaleString()}` + ' Visits';
    resultElement_favorite.innerHTML = `${gameData.favoritedCount.toLocaleString()}` + ' Favorited'; 
    resultElement_playing.innerHTML = `${gameData.playing.toLocaleString()}` + ' Online';
  })
  .catch(error => {
    console.error(error);
  });
