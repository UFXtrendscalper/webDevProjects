
const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')

searchForm.addEventListener('submit', async (e) => { 
    e.preventDefault();

    try {
        const searchResponse = await fetch(`https://www.omdbapi.com/?apikey=eb4db9fc&s=${searchInput.value}`);
        const searchData = await searchResponse.json();

        if (searchData.Search) {
            const moviesDetails = await Promise.all(searchData.Search.map(async (movie) => {
                const res = await fetch(`https://www.omdbapi.com/?apikey=eb4db9fc&i=${movie.imdbID}`);
                return res.json();
            }));

            const html = moviesDetails.map(({ Title, Year, Runtime, Genre, Plot, Poster, imdbRating, imdbID }) => `
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
                        <div class="add-to-watchlist flex">
                            <img id="${imdbID}" class="plus-icon" src="./assets/plus_icon.png" alt="Add to Watchlist">  
                            <span>Add to Watchlist</span>                     
                        </div>
                    </div>
                </div>
            `).join('');

            document.querySelector('.movie-section').innerHTML = html;
            
        } else {
            document.querySelector('.movie-section').innerHTML = `
                <div class="movie-card">
                    <p>Unable to find what you’re looking for. Please try another search.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to fetch movie details:', error);
        // Handle the error e.g., by showing an error message to the user
    }
});

document.querySelector('.movie-section').addEventListener('click', function(e) {
    if (e.target.classList.contains('plus-icon')) {
        const movieId = e.target.id
        addMovieToWatchList(movieId)
    }
});

function addMovieToWatchList(movieId) { 
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    if (!watchlist.includes(movieId)) { 
        watchlist.push(movieId)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }
}

function sortMovies(movieList) { 
    const sortedMovies = movieList.sort((a, b) => { 
        return parseInt(b.Year) - parseInt(a.Year)
    })
    return sortedMovies
}

// clear search input
searchInput.addEventListener('focus', function () {
    searchInput.value = ''
})