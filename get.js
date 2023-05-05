fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`) // get
  .then(response => response.json())
  .then(data => {
    const resultElement_visit = document.getElementById("visits");
    const resultElement_favorite = document.getElementById("fav");
    const resultElement_playing = document.getElementById("playing");
    
    resultElement_visit.innerHTML = `${data.visits}` + ' Visits';
    resultElement_favorite.innerHTML = `${data.favoritedCount}` + ' Favorited'; 
    resultElement_playing.innerHTML = `${data.playing}` + ' Online'
  })
  .catch(error => {
    console.error(error);
  });

