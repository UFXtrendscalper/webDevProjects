async function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []
    const watchlistSection = document.getElementById('movie-section')

    if (watchlist.length === 0) {
        watchlistSection.innerHTML = `
            <div class="watchlist-content">
                <h2 class="mt-watchlist">Your watchlist is looking a little empty...</h2>
                <div class="watchlist-wrapper">
                    <img src="./assets/plus_icon.png" alt="Add movies">
                    <h3>Let’s add some movies!</h3>
                </div>
            </div>
        `
        return
    }
    // Use Promise.all to wait for all fetch calls to complete
    const html = await Promise.all(watchlist.map(async (movieId) => {
        const res = await fetch(`https://www.omdbapi.com/?apikey=eb4db9fc&i=${movieId}`)
        const data = await res.json()
        const { Title, Year, Runtime, Genre, Plot, Poster, imdbRating } = data

        return `
            <div class="movie-card">
                <div class="movie-img">
                    <img src=${Poster} alt="${Title}">
                </div>
                <div class="movie-description">
                    <div class="title-wrapper">
                        <h3>${Title}</h3>
                        <img class="star" src="./assets/star.png" alt="star">    
                        <span class="imdbRating">${imdbRating}/10</span>
                    </div>
                    <p class="runtime">${Runtime}</p>
                    <p class="Genre">${Genre}</p>
                    <p class="year">${Year}</p>
                    <p class="plot">${Plot}</p>
                    <div class="remove-from-watchlist flex">
                        <img id="${movieId}" class="minus-icon" src="./assets/minus_icon.png" alt="Remove from Watchlist">  
                        <span>Remove</span>                     
                    </div>
                </div>
            </div>
        `;
    }));
    watchlistSection.innerHTML = html.join('')
}

loadWatchlist();

document.getElementById('movie-section').addEventListener('click', (e) => { 
    if (e.target.classList.contains('minus-icon')) {
        const movieId = e.target.id
        console.log(movieId)
        removeMovieFromWatchList(movieId)
    }
})

function removeMovieFromWatchList(movieId) { 
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    watchlist = watchlist.filter((id) => id !== movieId)

    localStorage.setItem('watchlist', JSON.stringify(watchlist))

    loadWatchlist()
}