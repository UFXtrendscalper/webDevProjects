import data from './data.json' assert { type: 'json' }

const summaryCompEl = document.getElementById('summary-comp')

// map through the data and create a new array of objects
const summary = data.map((item) => { 
    return `
        <div class="${item.class} card flex">
            <img id="icon" src=${item.icon} alt=${item.alt}>
            <span id="category" class=" ${item.color}">${item.category}</span>
            <span id="score" class="score">${item.score}</span> / 100
        </div>
    `
})
// render the summary array to the DOM
summaryCompEl.innerHTML = summary.join('')