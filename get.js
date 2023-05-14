const tt = 10

fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`) // get game data
  .then(response => response.json())
  .then(tab => {
    const resultElement_visit = document.getElementById("visits");
    const resultElement_favorite = document.getElementById("fav");
    const resultElement_playing = document.getElementById("playing");
    const resultElement_like = document.getElementById("like");
    const resultElement_status = document.getElementById("status");
    const gameData = tab.data[0];
    const tweentime = 0.5

    //to do make display for difference in values after update
    let visit_prev = gameData.visits;
    let fav_prev = gameData.favoritedCount;
    let playing_prev = gameData.playing;
    let past_visit_prev = gameData.visits;
    let past_fav_prev = gameData.favoritedCount;
    let past_playing_prev = gameData.playing;
    let repetition = 0
    
    resultElement_visit.innerHTML = "Fetching...";
    resultElement_favorite.innerHTML = "Fetching...";
    resultElement_playing.innerHTML = "Fetching...";
    resultElement_status.innerHTML = 'PARSING';
    resultElement_status.style.background = '#00000073'
    
    // Create a tween for each number element
    let visitTween = new TWEEN.Tween({ value: visit_prev })
      .to({ value: gameData.visits }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_visit.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
      let favoriteTween = new TWEEN.Tween({ value: fav_prev })
      .to({ value: gameData.favoritedCount }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_favorite.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
      let playingTween = new TWEEN.Tween({ value: playing_prev })
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
    resultElement_visit.innerHTML = `${gameData.visits.toLocaleString()}` + '';
    resultElement_favorite.innerHTML = `${gameData.favoritedCount.toLocaleString()}` + '';
    resultElement_playing.innerHTML = `${gameData.playing.toLocaleString()}` + '';
    resultElement_status.innerHTML = resultElement_status.innerHTML === 'ONLINE' ? 'ONLINE' : 'IN MAINTENANCE';

    // Update data every 60 seconds
    setInterval(() => {
      fetch(`https://games.roproxy.com/v1/games?universeIds=2332891023`)
      .then(response => response.json())
        .then(tab => {
      resultElement_visit.innerHTML = "Fetching...";
      resultElement_favorite.innerHTML = "Fetching...";
      resultElement_playing.innerHTML = "Fetching...";
      resultElement_status.innerHTML = 'PARSING';
      resultElement_status.style.background = '#00000073'
      const updatedGameData = tab.data[0];
      let visitTween = new TWEEN.Tween({ value: visit_prev })
      .to({ value: gameData.visits }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_visit.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
      let favoriteTween = new TWEEN.Tween({ value: fav_prev })
      .to({ value: gameData.favoritedCount }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_favorite.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
    
      let playingTween = new TWEEN.Tween({ value: playing_prev })
      .to({ value: gameData.playing }, tweentime*1e3)
      .onUpdate(({ value }) => resultElement_playing.innerHTML = `${Math.floor(value).toLocaleString()}` + '');
      visitTween.to({ value: updatedGameData.visits }, tweentime*1e3).start();
      favoriteTween.to({ value: updatedGameData.favoritedCount }, tweentime*1e3).start();
      playingTween.to({ value: updatedGameData.playing }, tweentime*1e3).start();

      if (updatedGameData.name.includes("[MAINTENANCE]")) {
        resultElement_status.innerHTML = 'IN MAINTENANCE'; 
        resultElement_status.style.background = '#ff000073'
      } else {
        resultElement_status.innerHTML = 'ONLINE';
        resultElement_status.style.background = '#00ff0073'
      }
      
      visit_prev = updatedGameData.visits
      fav_prev = updatedGameData.favoritedCount
      playing_prev = updatedGameData.playing
    // Revert the text and styles of the result elements to their initial values
    resultElement_visit.innerHTML = `${gameData.visits.toLocaleString()}` + '';
    resultElement_favorite.innerHTML = `${gameData.favoritedCount.toLocaleString()}` + '';
    resultElement_playing.innerHTML = `${gameData.playing.toLocaleString()}` + '';
    resultElement_status.innerHTML = resultElement_status.innerHTML === 'ONLINE' ? 'ONLINE' : 'IN MAINTENANCE';
  })
  .catch(error => {
    console.error(error);
  });
}, tt*1e3);

})
.catch(error => {
  console.error(error);
});
