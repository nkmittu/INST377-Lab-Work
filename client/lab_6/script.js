/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
async function windowActions() {
  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const request = await fetch(endpoint);
  const results = await request.json();

  function findMatches(wordToMatch, results) {
    return results.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.City.match(regex) || place.State.match(regex);
    });
  }

  function displayMatches(event) {
    function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    const suggestions = document.querySelector('.suggestions');
    const matchArray = findMatches(event.target.value, results);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const cityName = place.City.replace(regex, `<span class="hl">${event.target.value}</span>`);
      const stateName = place.State.replace(regex, `<span class="hl">${event.target.value}</span>`);
      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
        </li>`;
    }).join('');
    suggestions.innerHTML = html;
  }

  const searchInput = document.querySelector('.search');
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}
window.onload = windowActions;