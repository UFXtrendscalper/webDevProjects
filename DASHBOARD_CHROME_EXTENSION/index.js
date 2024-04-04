// Define global constants for APIs and elements
const backgroundImageAPI = 'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=ocean+sunset'
const cryptoAPIBase = 'https://api.coingecko.com/api/v3/coins/'
const coins = ['bitcoin', 'ethereum']
const cryptoContainer = document.getElementById('crypto-container')
const timeEl = document.getElementById('time')
const timeInterval = ((1000 * 60) * 15) // set the interval to update every 15 minutes
const weatherAPI = 'https://apis.scrimba.com/openweathermap/data/2.5/weather?appid=60cc44b934883065b139da58aea50e0a&units=metric'
const weatherContainer = document.getElementById('weather-container')

// Function to get the user location as a Promise
function getWeatherLocation() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const { latitude, longitude } = position.coords;
                resolve({ latitude, longitude });
            },
            err => reject(err)
        );
    });
}     

// Function to get the weather data
async function fetchWeather(latitude, longitude) {
    const response = await fetch(`${weatherAPI}&lat=${latitude}&lon=${longitude}`)
    return response.json()
}

// Update the UI with the weather data
async function updateWeatherData() { 
    try { 
        // clear the container before updating
        weatherContainer.innerHTML = ''
        const { latitude, longitude } = await getWeatherLocation();
        const weatherData = await fetchWeather(latitude, longitude)

        // create the fragment to hold the weather data
        const fragment = document.createDocumentFragment()
        // create the consts that we want to display
        const location = weatherData.name
        const temperature = Math.round(weatherData.main.temp)
        const weather = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon

        // create the elements to display the weather data
        const locationEl = document.createElement('h1')
        locationEl.textContent = location
        const temperatureEl = document.createElement('p')
        temperatureEl.textContent = `${temperature}°C`
        temperatureEl.classList.add('temperature')
        const weatherEl = document.createElement('p')
        weatherEl.textContent = weather
        const iconEl = document.createElement('img')
        iconEl.src = `https://openweathermap.org/img/w/${icon}.png`
        iconEl.classList.add('icon')

        // append the elements to the fragment
        fragment.appendChild(locationEl)
        fragment.appendChild(temperatureEl)
        fragment.appendChild(weatherEl)
        fragment.appendChild(iconEl)

        weatherContainer.appendChild(fragment)
    
    }
    catch (err) {
        console.error('Failed to fetch weather data:', err)
    }
}

// Function to display the current time
function displayTime() {
    const now = new Date()
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    timeEl.textContent = timeString
}

// Function to set the background image
async function setBackground() {
    try {
        const response = await fetch(backgroundImageAPI)
        const data = await response.json()
        document.body.style.backgroundImage = `url(${data.urls.full})`
        const authorName = data.user.name || 'Anonymous'
        document.getElementById('author').textContent = `By: ${authorName}`
        const location = data.user.location || 'Unknown'
        document.getElementById('location').textContent = `Location: ${location}`
    } catch (err) {
        document.body.style.backgroundImage = `url('./assets/bg_fallback.jpg')`
    }
}

// Function to fetch and display cryptocurrency data
async function fetchCryptoData(coinId) {
    const response = await fetch(`${cryptoAPIBase}${coinId}?market_data=true`)
    return response.json()
}

// Function to update the UI with cryptocurrency data
async function updateCryptoData() {
    try {
        // clear the container before updating
        cryptoContainer.innerHTML = ''

        const promises = coins.map(fetchCryptoData)
        const results = await Promise.all(promises)
        const fragment = document.createDocumentFragment()
        
        results.forEach((coinData) => {
            const cryptoName = coinData.name
            const cryptoPrice = coinData.market_data.current_price.usd
            const cryptoLogo = coinData.image.small
            const cryptoSentimentUp = coinData.sentiment_votes_up_percentage
            const cryptoSentimentDown = coinData.sentiment_votes_down_percentage
            
            // create a div for logo 
            const logoDiv = document.createElement('div')
            const logoEl = document.createElement('img')
            logoEl.src = cryptoLogo
            logoDiv.appendChild(logoEl)

            // create a div for name, price and sentiment
            const cryptoDiv = document.createElement('div')
            cryptoDiv.classList.add('crypto-info')
            const nameEl = document.createElement('h2')
            nameEl.textContent = cryptoName
            cryptoDiv.appendChild(nameEl)
            const priceEl = document.createElement('h3')
            priceEl.textContent = `$${cryptoPrice}`
            cryptoDiv.appendChild(priceEl)
            const sentimentEl = document.createElement('h4')
            sentimentEl.textContent = `👍 ${cryptoSentimentUp}% 👎 ${cryptoSentimentDown}%`
            cryptoDiv.appendChild(sentimentEl)

            // create a container for logo and crypto div
            const cryptoContainer = document.createElement('div')
            cryptoContainer.classList.add('crypto')
            cryptoContainer.appendChild(logoDiv)
            cryptoContainer.appendChild(cryptoDiv)
            
            fragment.appendChild(cryptoContainer)
        })
        
        cryptoContainer.appendChild(fragment)
    } catch (err) {
        console.error('Failed to fetch cryptocurrency data:', err)
    }
}

// Initialize the dashboard by setting the background and updating crypto data
async function initDashboard() {
    displayTime()
    await setBackground()
    await updateCryptoData()
    await updateWeatherData()
}
// do an initial run to display the data
initDashboard()

// Set interval to update the dashboard
setInterval(initDashboard, timeInterval)
setInterval(displayTime, 60000)
