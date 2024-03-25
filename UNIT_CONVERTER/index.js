

const categories = [[length, 'Length (Meter/Feet)'], [volume, 'Volume (Liters/Gallons)'], [mass, 'Mass (Kilograms/Pounds)']]
const ucBtnEl = document.getElementById('uc-btn-el')
const ucInputEl = document.getElementById('uc-input-el')
const ucCardBottomEl = document.getElementById('uc-card-bottom-el')

ucBtnEl.addEventListener('click', function () {
    let userInput = ucInputEl.value
    // parse the user input
    userInput = Number(userInput)
    let output = ''
    for (let i = 0; i < categories.length; i++) { 
        const conversionResult = categories[i][0](userInput)
        output += `
            <div class="conversion-info">
                <h2 class="measurement-category">${categories[i][1]}</h2>
                <p class="conversion-data">${conversionResult}</p>
            </div>`
    }
    ucCardBottomEl.innerHTML = output 
})  

ucInputEl.addEventListener('click', function () { 
    ucInputEl.value = ''    
})

// conversion functions
function length(userInput) {
    // 1 meter = 3.281 feet
    // convert from meters to feet
    let feet = userInput * 3.281
    // convert from feet to meters
    let meters = userInput / 3.281
    return `${userInput} meters = ${feet.toFixed(3)} feet | ${userInput} feet = ${meters.toFixed(3)} meters`
}

function volume(userInput) {
    // 1 liter = 0.264 gallon
    // convert from liter to gallon
    let gallon = userInput * 0.264
    // convert from gallon to liter
    let liter = userInput / 0.264
    return `${userInput} liters = ${gallon.toFixed(3)} gallons | ${userInput} gallons = ${liter.toFixed(3)} liters`
}

function mass(userInput) {
    // 1 kilogram = 2.204 pound
    // convert from kilogram to pound
    let pound = userInput * 3.281
    // convert from pound to kilogram
    let kilogram = userInput / 3.281
    return `${userInput} kilos = ${pound.toFixed(3)} pounds | ${userInput} pounds = ${kilogram.toFixed(3)} kilos`
}

