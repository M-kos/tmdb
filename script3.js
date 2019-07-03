const API_KEY = '014032a957f4eef523d9157aa26bca42';


const searchMovieUrl = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=ru-RU&query=`;

const imgSrc = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

function mapData(data) {
  return {
    title: data.title || data.name || 'Unknown',
    date: data.first_air_date || data.release_date,
    img: imgSrc + data.poster_path || imgSrc + data.backdrop_path,
    language: data.original_language,
    overview: data.overview,
    popularity: data.popularity
  }
}

function movie(data) {
  const mData = mapData(data);
  const html = `
  <article class="movie">
      <h2>${mData.title}</h2>
      <date>${mData.date}</date>
      <div><img src="${mData.img}"></div>
      <div>${mData.language}</div>
      <div>${mData.overview}</div>
      <div>${mData.popularity}</div>
  </article>
  `
  return html;
}



class MovieList {
  constructor(data) {
      this.data = data;
      this.renderMovies();
  }

  drawToDom(selector) {
      this.clearList(selector);
      selector.appendChild(this.fragment);
  }

  renderMovies() {
      this.fragment = document.createDocumentFragment();

      this.data.results.forEach(data => {
          const article = document.createElement('article');
          article.classList.add('movie');
          article.innerHTML = movie(data);
          this.fragment.appendChild(article);
      });
  }
  clearList(selector) {
    selector.innerHTML = '';
  }
}

function getVideoByText(text) {
  if(!text) {
      return;
  }

  return fetch(searchMovieUrl + text)
    .then(r => r.json());
}


const input = document.querySelector('.search-input');

const movieList = document.querySelector('.movies');

input.addEventListener('input', e => {
  const searchText = e.target.value;

  if(!searchText) {
    movieList.innerHTML = '';
    return;
  }

  getVideoByText(searchText)
    .then(result => {
      const list = new MovieList(result);

      list.drawToDom(movieList)
    })
});