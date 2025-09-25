import { chaveApi } from "./dadosApi.js";

const buscarFilme = document.querySelector('#buscarFilme');
const bntBuscar = document.querySelector('#BntFilme');
const dadosFilme = document.querySelector('.dados-filme');

async function buscarFilmesPorTitulo(titulo) {
  dadosFilme.innerHTML = `<p>Buscando...</p>`;

  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(titulo)}&apikey=${chaveApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error(data.Error);
    }

    mostrarFilmes(data.Search);

  } catch (error) {
    dadosFilme.innerHTML = `<p>${error.message}</p>`;
  }
}

function mostrarFilmes(listaFilmes) {
  dadosFilme.innerHTML = ''; // limpa o container

  listaFilmes.forEach(filme => {
    const filmeHTML = `
      <div class="filme">
        <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/150'}" alt="Poster do filme ${filme.Title}">
        <h2>${filme.Title} (${filme.Year})</h2>
        <p>Tipo: ${filme.Type}</p>
      </div>
    `;
    dadosFilme.insertAdjacentHTML('beforeend', filmeHTML);
  });
}

bntBuscar.addEventListener('click', () => {
  const titulo = buscarFilme.value.trim();
  if (titulo) {
    buscarFilmesPorTitulo(titulo);
  } else {
    dadosFilme.innerHTML = `<p>Por favor, digite um título para buscar.</p>`;
  }
});
