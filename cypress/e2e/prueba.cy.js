// Shows commands
///<reference types="Cypress"/>

/*
//const filePath = "cypress/e2e/desafios/desafio1.cy.js"; // Reemplaza esto con la ruta real de tu archivo
const filePath = __filename;

// Obtener el nombre del archivo sin la extensión
const fileName = filePath.split("/").pop(); // Obtiene "desafio1.cy.js"
const fileNameWithoutExtension = fileName.replace(/\.[^.]+$/, ""); // Elimina la extensión

// Agregar la palabra "data"
const modifiedFileName = `${fileNameWithoutExtension}data`;

// Mostrar el resultado por consola
console.log("Nombre del archivo modificado:", modifiedFileName);
*/

const filePathStr = __filename.replaceAll('\\', '/');

describe('Prueba comando', () => {

    it('Test 1:', () => {

        

    })

});