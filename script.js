import { chaveApi } from "./dadosApi.js";

const buscarFilme = document.querySelector('#buscarFilme');
const bntBuscar = document.querySelector('#BntFilme');
const dadosFilme = document.querySelector('#dadosFilme');

// Função para buscar lista de filmes
async function buscarFilmesPorTitulo(titulo) {
  dadosFilme.innerHTML = `<p>Buscando...</p>`;

  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(titulo)}&apikey=${chaveApi}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "False") {
      throw new Error("Filme não encontrado! Tente outro título.");
    }

    mostrarListaDeFilmes(data.Search);

  } catch (error) {
    dadosFilme.innerHTML = `<p style="color:red">${error.message}</p>`;
  }
}

// Função para mostrar vários filmes
function mostrarListaDeFilmes(listaFilmes) {
  dadosFilme.innerHTML = ''; // limpa a área antes de mostrar os resultados

  listaFilmes.forEach(filme => {
    const filmeHTML = `
      <div class="filme-card">
        <img src="${filme.Poster !== 'N/A' ? filme.Poster : 'https://via.placeholder.com/200'}" 
             alt="Poster do filme ${filme.Title}">
        <div class="filme-info">
          <h2>${filme.Title} (${filme.Year})</h2>
          <p><strong>Tipo:</strong> ${filme.Type}</p>
        </div>
      </div>
    `;
    dadosFilme.insertAdjacentHTML('beforeend', filmeHTML);
  });
}

// Evento de clique
bntBuscar.addEventListener('click', () => {
  const titulo = buscarFilme.value.trim();
  if (titulo) {
    buscarFilmesPorTitulo(titulo);
  } else {
    dadosFilme.innerHTML = `<p style="color:orange">Por favor, digite um título para buscar.</p>`;
  }
});
