'use strict';

/**
 * Realiza una petición fetch a la URL proporcionada y devuelve un objeto con el resultado.
 *
 * @param {string} url - La URL desde donde se obtendrán los datos.
 * @returns {Promise<{success: boolean, body?: any, error?: string}>} Un objeto con:
 *   - success: indica si la petición fue exitosa,
 *   - body: los datos obtenidos (presente si success es true),
 *   - error: mensaje de error (presente si success es false).
 *
 * @throws {Error} Lanza un error si la respuesta HTTP no es exitosa (status distinto de 2xx).
 */
export const fetchFakerData = (url) => {
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            return {
                success: true,
                body: data
            };
        })
        .catch(error => {
            return {
                success: false,
                error: `Error al obtener datos: ${error.message}`
            };
        });
};
