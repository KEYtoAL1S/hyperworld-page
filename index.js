const koDataElement = document.getElementById('ko-data');

axios.get('https://keytoal1s.com/api/kos')
  .then(response => {
    const koData = response.data;

    koData.forEach(ko => {
      const li = document.createElement('li');
      li.textContent = `${ko.killer} KO'd ${ko.victim}`;
      koDataElement.appendChild(li);
    });
  })
  .catch(error => {
    console.error(error);
  });
