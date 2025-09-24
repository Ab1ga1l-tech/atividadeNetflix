
import {chaveApi} from "./dadosApi.js";

const buscarFilme = document.querySelector('#buscarFilme');
const bntBuscar = document.querySelector('BntFilme');

async function buscarCep(){
    dadosEndereco.innerHTML = `<p>Buscar dados...</p>`;

const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${chaveApi}`
    try{
        const response = await fetch(url);
        const data = await response.json();
        if(data.erro){
            throw new Error ('Cep não encontrado!');
        }
        mostrarEndereco(data);

    }catch{
        dadosEndereco.innerHTML= `<p> ${console.error(error)}</p>`
    }
}

function mostrarEndereco(enderecoCep){
    dadosEndereco.innerHTML='';

    const enderecoHTML = `
    <ul>
        <li><strong>Cep: </strong>${enderecoCep.cep}</li>
        <li><strong>Bairro: </strong>${enderecoCep.bairro}</li>
        <li><strong>Logadouro: </strong>${enderecoCep.logadouro}</li>
        <li><strong>Cidade: </strong>${enderecoCep.uf}</li>
    </ul>
    `
    dadosEndereco.innerHTML = enderecoHTML;
}


bntBuscar.addEventListener('click',()=>{
    const cep = campoCep.value.trim();
    buscarCep(cep)
})
