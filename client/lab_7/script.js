/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);
  const arrayName = await request.json();

  const mymap = L.map('mapid').setView([38.989, -76.937], 12);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibmttaXR0dSIsImEiOiJja3YwNDNqbG03aXJuMnBtYWJoeGp1NG4zIn0.QkhrysQck6g8vrQljL_Yzw'
  }).addTo(mymap);

  function findMatches(wordToMatch, arrayName) {
    return arrayName.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, arrayName);
    console.log(matchArray);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      return `
                        <li>
                          <span class="name"><span class="hl">${place.name}</span>, <span class="hl">${place.zip}</span></span>
                        </li>
                      `;
    }).join('');
    if (event.target.value) {
      suggestions.innerHTML = html;
    } else {
      suggestions.innerHTML = '';
    }
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', (evt) => { displayMatches(evt); });
  searchInput.addEventListener('keyup', (evt) => { displayMatches(evt); });
}
window.onload = windowActions;