
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MTE5MmE0ODQyNTc4MTM3YjJiNDZmYjA3ZjkwNGI2MCIsIm5iZiI6MTcyOTA0MTYxOC45OTQ5MTcsInN1YiI6IjY3MGRjZmNhMGI4MDA1MzdkNzVjYmExYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.z4q68wjAqufmM4jcLC-A4WFwMK47_Hc9tCajgZ4tJ6M'
    }
};


function getData() {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1$api_key=81192a4842578137b2b46fb07f904b60';
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            let movies = data.results
            movies.forEach(movie => {
                const movieList = document.querySelector(".movies");
                const movieContainer = document.createElement('div')// <div></div>

                movieContainer.innerHTML = `
                <div class="box">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class = "poster">
                <h3 calss = "title">${movie.title}</h3>
                <p class = "aver"> 평점 : ${movie.vote_average}</p>
                </div>`;

                movieContainer.addEventListener("click", () => {modal(movie)})
                movieList.appendChild(movieContainer);
            })
        })
        .catch(err => console.error(err));
}

function searchMovie() {
    const searchInput = document.querySelector('.search_input').value;
    console.log(searchInput)
    const url = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1$api_key=81192a4842578137b2b46fb07f904b60';
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            const filteredMovies = data.results.filter((movie) => movie.title.includes(searchInput));
            console.log(filteredMovies);
            const movieList = document.querySelector(".movies");
            movieList.innerHTML = ""
            filteredMovies.forEach(movie => {
                const movieContainer = document.createElement('div')
                movieContainer.innerHTML = `
                <div class="box">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class = "poster">
                <h3 calss = "title">${movie.title}</h3>
                <p class = "aver"> 평점 : ${movie.vote_average}</p>
                </div>`;
                movieList.appendChild(movieContainer);

                
                
            })
        })
    .catch(err => console.error(err));
}

const searchInput = document.querySelector('.search_input');
searchInput.addEventListener("keyup",function(event) {
    if(event.keyCode ===13) {
        event.preventDefault();
        document.querySelector(".search_button").click();
    }
});


function modal(movie) {
                const modal = document.querySelector(".modal");
                const movieContainer = document.createElement('div')// <div></div>

                movieContainer.innerHTML = `
                <div class="modalBox">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class = "modalImage">
                <h2 calss = "modalTitle">${movie.title}</h2>
                <h3 class = "modalOverview">${movie.overview}</h3>
                <h3 class = "modalReleaseDate"> 개봉일 : ${movie.release_date}</h3>
                <h3 class = "modalRating"> 평점 : ${movie.vote_average}</h3>
                </div>`;
                modal.appendChild(movieContainer);
} 

getData();

