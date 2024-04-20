// Fetch the JSON data from the local JSON file
fetch('./data.json')
  .then(response => response.json())
  .then(data => {
    // Process the data
    const summaryCompEl = document.getElementById('summary-comp');
    const summary = data.map(item => {
      return `
        <div class="${item.class} card flex">
            <img id="icon" src=${item.icon} alt=${item.alt}>
            <span id="category" class="${item.color}">${item.category}</span>
            <span id="score" class="score">${item.score}</span> / 100
        </div>
      `;
    });
    // Render the summary array to the DOM
    summaryCompEl.innerHTML = summary.join('');
  })
  .catch(error => console.error('Error loading the JSON file:', error));
