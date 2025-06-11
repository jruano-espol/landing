'use strict';

import { fetchFakerData } from './functions';
import { saveVote, getVotes } from './firebase';

/**
 * Añade la clase md:block a el elemento de #toast-interactive.
 * 
 * @function
 */
const showToast = () => {
    let popup = document.getElementById('toast-interactive');
    if (popup) {
        popup.classList.add("md:block");
    }
};

/**
 * Añade un EventListener al botón #demo que abre un video de youtube.
 * 
 * @function
 * @listens click
 * @fires window.open
 */
const showVideo = () => {
    let video = document.getElementById('demo');
    video.addEventListener('click', () => {
        window.open('https://www.youtube.com/watch?v=14jlIxVrcvo', '_blank');
    });
};

/**
 * Renderiza un máximo de tres tarjetas HTML con información de objetos proporcionados.
 *
 * Esta función toma un arreglo de objetos con propiedades como `title`, `author`, `genre`
 * y `content`, y genera hasta tres tarjetas HTML que se insertan en un contenedor
 * con el ID `skeleton-container`. Si el contenedor no existe, la función no hace nada.
 *
 * @function renderCards
 * @param {Array<Object>} objects - Arreglo de objetos que contienen los datos a renderizar.
 * @param {string} objects[].title - Título del contenido.
 * @param {string} objects[].author - Autor del contenido.
 * @param {string} objects[].genre - Género del contenido.
 * @param {string} objects[].content - Texto o contenido principal.
 * @returns {void}
 */
const renderCards = (objects) => {
    const container = document.getElementById('skeleton-container');
    if (!container) return;
    container.innerHTML = '';

    const count = Math.min(3, objects.length);
    for (let i = 0; i < count; i++) {
        const object = objects[i];
        const cardHTML = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4">
                <h2 class="text-xl font-semibold text-gray-800 mb-2">${object.title}</h2>
                <p class="text-sm text-gray-600 mb-1"><strong>Autor:</strong> ${object.author}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>Género:</strong> ${object.genre}</p>
                <p class="text-gray-700 text-base">${object.content}</p>
            </div>
        `;
        container.innerHTML += cardHTML;
    }
};

/**
 * Carga datos de texto desde la API de Faker y los muestra en tarjetas.
 *
 * Esta función realiza una solicitud a la API `fakerapi.it` para obtener 
 * 10 textos falsos de hasta 120 caracteres cada uno. Si la solicitud 
 * es exitosa, los datos se renderizan usando `renderCards`. Si hay un 
 * error, se muestra en la consola.
 *
 * @async
 * @function loadData
 * @returns {Promise<void>} No retorna ningún valor, pero realiza efectos secundarios como 
 * imprimir en consola y renderizar datos en la interfaz.
 */
const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';
    const result = await fetchFakerData(url);
    if (result.success) {
        renderCards(result.body.data);
        console.log(result.body);
    } else {
        console.log(`Error: ${result.error}`);
    }
};

function enableForm() {
    let form = document.getElementById('form_voting');
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            let product = document.getElementById('select_product');
            if (product) {
                const response = await saveVote(product.value);
                if (response.success) {
                    await displayVotes();
                    alert(response.message);
                } else {
                    alert(`Error: ${response.message}`);
                }
            } else {
                alert('Por favor, ingresa un ID de producto válido.');
            }
            form.reset();
        });
    }
}

function displayVotes() {
    const votes = getVotes();
    votes.then(data => {
        const results = document.getElementById('results');
        if (!results) return;

        if (!data || Object.keys(data).length === 0) {
            results.innerHTML = '<p>No hay votos registrados.</p>';
            return;
        }

        let table = `<table class="min-w-full border text-sm">
            <thead>
                <tr>
                    <th class="border px-4 py-2">Producto</th>
                    <th class="border px-4 py-2">Total de votos</th>
                </tr>
            </thead>
            <tbody>
        `;

        Object.entries(data).forEach(([product, total]) => {
            table += `
                <tr>
                    <td class="border px-4 py-2">${product}</td>
                    <td class="border px-4 py-2">${total}</td>
                </tr>
            `;
        });

        table += '</tbody></table>';
        results.innerHTML = table;
    });
}

(() => {
    showToast();
    showVideo();
    loadData();
    enableForm();
    displayVotes();
})();
