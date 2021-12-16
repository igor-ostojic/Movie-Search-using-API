const search = document.querySelector("#search");
const apiKey = "e546593458598efbf84e3498ddc6db6a";
const imgPath = "https://image.tmdb.org/t/p/w200";
const movieDiv = document.querySelector(".movies-container");
const noResults = document.querySelector(".no-results");

// ___________SEARCH___________

search.addEventListener("keypress", getResults);

function getResults(e) {
  if (e.key == "Enter") {
    getData();

    async function getData() {
      let response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=e546593458598efbf84e3498ddc6db6a&language=en-US&query=${search.value}&page=1&include_adult=false`
      );
      let responsejson = await response.json();
      let movieList = responsejson.results;

      if (movieDiv.innerHTML != "") {
        movieDiv.innerHTML = "";
      }

      if (movieList.length == 0) {
        noResults.innerText = "No Results.";
      } else {
        for (let i of movieList) {
          let html = "";
          let movieCardDiv = document.createElement("div");
          movieCardDiv.classList.add("movie-card");
          html += `
          <div class="image-container">`;
          if (i.poster_path == null) {
            html += `<img class="movie-image" src="no_img.png" alt="${i.title}" style="width: 200px; height: 300px;"/>`;
          } else {
            html += `<img class="movie-image" src="${imgPath}${i.poster_path}" alt="${i.title}" />`;
          }
          html += `</div>
          <div class="movie-info-wrapper">
            <div class="first-part">
              <h3 class="movie-title">${i.title}<span class="movie-year">(${
            i.release_date.split("-")[0]
          })</span></h3>
              <p class="movie-info">
                <span class="release-date">${i.release_date} (US)</span
                ><span class="genre">Adventure, Fantasy, Action</span
                ><span class="movie-lenght">2h 49m</span>
              </p>
            </div>
            <div class="percentage-wrapper">
              <div class="user-score">
                <div class="score-percent">${i.vote_average}%</div>
                <p>User Score</p>
              </div>
              <div class="popularity">
                <div class="popularity-percent">${i.popularity.toFixed(2)}</div>
                <p>Popularity</p>
              </div>
            </div>
            <div class="overview">
              <h3>Overview</h3>
              <p class="movie-overview">`;
          if (i.overview == "") {
            html += `There is no overview for this movie.`;
          } else {
            html += `${i.overview}`;
          }
          html += `</p>
            </div>
          </div>
        `;
          movieCardDiv.innerHTML = html;
          movieDiv.appendChild(movieCardDiv);
        }
      }
    }
  }
}
