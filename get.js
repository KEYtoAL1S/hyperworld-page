fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`) // get game data
  .then(response => response.json())
  .then(tab => {
    const resultElement_visit = document.getElementById("visits");
    const resultElement_favorite = document.getElementById("fav");
    const resultElement_playing = document.getElementById("playing");
    const resultElement_status = document.getElementById("status");

    let visit_prev = 0
    let fav_prev = 0
    let playing_prev = 0

    const gameData = tab.data[0]; // Assuming that we want to display data for the first game in the array

    const tweentime = 2
    
    resultElement_visit.innerHTML = "Loading...";
resultElement_favorite.innerHTML = "Loading...";
resultElement_playing.innerHTML = "Loading...";
resultElement_status.innerHTML = "Loading...";
resultElement_visit.style.letterSpacing = "15px";

    

    // Create a tween for each number element
    const visitTween = new TWEEN.Tween({ value: visit_prev })
      .to({ value: gameData.visits }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_visit.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
    const favoriteTween = new TWEEN.Tween({ value: fav_prev })
      .to({ value: gameData.favoritedCount }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_favorite.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
    const playingTween = new TWEEN.Tween({ value: playing_prev })
      .to({ value: gameData.playing }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_playing.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
    // Start the tweens
    visitTween.start();
    favoriteTween.start();
    playingTween.start();
    
    // Update the tweens every frame
    function animate() {
      requestAnimationFrame(animate);
      TWEEN.update();
    }
    animate();
    
    if (gameData.name.includes("[MAINTENANCE]")) {
      resultElement_status.innerHTML = 'IN MAINTENANCE'; 
      resultElement_status.style.background = '#ff000073'
    } else {
      resultElement_status.innerHTML = 'ONLINE';
      resultElement_status.style.background = '#00ff0073'
    }
    // Revert the text and styles of the result elements to their initial values
    resultElement_visit.style.letterSpacing = "2px";
    resultElement_visit.innerHTML = `${gameData.visits.toLocaleString()}` + '';
    resultElement_favorite.innerHTML = `${gameData.favoritedCount.toLocaleString()}` + '';
    resultElement_playing.innerHTML = `${gameData.playing.toLocaleString()}` + '';
    resultElement_status.innerHTML = resultElement_status.innerHTML === 'ONLINE' ? 'ONLINE' : 'OUT OF SERVICE';

    // Update data every 60 seconds
    setInterval(() => {
      fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`)
        .then(response => response.json())
        .then(tab => {
                // Set the text and style of the result elements to indicate loading
      resultElement_visit.innerHTML = "Loading...";
      resultElement_favorite.innerHTML = "Loading...";
      resultElement_playing.innerHTML = "Loading...";
      resultElement_status.innerHTML = "Loading...";
      resultElement_visit.style.letterSpacing = "15px";

          visit_prev = gameData.visits
          fav_prev = gameData.favoritedCount
          playing_prev = gameData.playing

          const updatedGameData = tab.data[0];
          visitTween.to({ value: updatedGameData.visits }, 1000).start();
          favoriteTween.to({ value: updatedGameData.favoritedCount }, 1000).start();
          playingTween.to({ value: updatedGameData.playing }, 1000).start();
    
          if (updatedGameData.name.includes("[MAINTENANCE]")) {
            resultElement_status.innerHTML = 'IN MAINTENANCE'; 
            resultElement_status.style.background = '#ff000073'
          } else {
            resultElement_status.innerHTML = 'ONLINE';
            resultElement_status.style.background = '#00ff0073'
          }
          
    // Revert the text and styles of the result elements to their initial values
    resultElement_visit.style.letterSpacing = "2px";
    resultElement_visit.innerHTML = `${gameData.visits.toLocaleString()}` + '';
    resultElement_favorite.innerHTML = `${gameData.favoritedCount.toLocaleString()}` + '';
    resultElement_playing.innerHTML = `${gameData.playing.toLocaleString()}` + '';
    resultElement_status.innerHTML = resultElement_status.innerHTML === 'ONLINE' ? 'ONLINE' : 'IN MAINTENANCE';
        })
        .catch(error => {
          console.error(error);
        });
    }, 60000);

  })
  .catch(error => {
    console.error(error);
  });
