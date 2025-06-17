// scripts/movies.mjs

const movieList = document.getElementById('movie-list');

async function fetchMovies() {
  try {
    const response = await fetch('data/movies.json');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const movies = await response.json();

    displayMovies(movies);
  } catch (error) {
    movieList.innerHTML = `<p>Failed to load movies: ${error.message}</p>`;
  }
}

function displayMovies(movies) {
  movieList.innerHTML = movies.map(movie => `
    <article class="movie-card" tabindex="0" aria-label="Movie: ${movie.title}">
      <img src="${movie.poster}" alt="Poster of ${movie.title}" loading="lazy" />
      <h2>${movie.title}</h2>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Year:</strong> ${movie.year}</p>
      <p><strong>Rating:</strong> ${movie.rating}</p>
    </article>
  `).join('');
}

fetchMovies();
