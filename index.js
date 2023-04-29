const Base_URL = "https://api.themoviedb.org/3";
const API_KEY = "api_key=1cf50e6248dc270629e802686245c2c8";

const API_URL = Base_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const search_URL = Base_URL + "/search/movie?" + API_KEY;
const img_url_front = "https://image.tmdb.org/t/p/w500";

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      showMovies(data.results);
    });
}

function showMovies(data) {
  
  main.innerHTML = '';
    data.forEach(movie => {
    
    const {title, poster_path, vote_average, overview} = movie;
    const movie_element = document.createElement("div");
    movie_element.classList.add("movie");
    movie_element.innerHTML = `
        <img src="${img_url_front + poster_path}" alt="">

        <div class="movie__info">
          <h3>${title}</h3>
          <span class="${changeColor(vote_average)}">${vote_average}</span>
        </div>

        <div class="summary">
          
          <p>${overview}
          </p>
        </div>
        `;

    main.appendChild(movie_element);
  });
}

function changeColor(vote) {
  if (vote >= 7.5) {
    return "green";
  } else if (vote < 8) {
    return "yellow";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search__term = search.value;

  if (search__term) {
    getMovies(search_URL + "&query=" + search__term);
  }
});
