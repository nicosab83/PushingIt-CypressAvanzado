// Shows commands
///<reference types="Cypress"/>

import { ProductSearchResultPage } from "../support/page/productSearchResultPage";

const fixturePath = 'desafio2data.json';
const productSearchResultPage = new ProductSearchResultPage();

describe('Cypress Avanzado - Desafío 2', () => {

    before(() => {
        cy.fixture(fixturePath).as('data');
    })

    beforeEach(() => {
        cy.log("Ingresar en Pushing IT");
        cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.visit("");
        cy.getByDataCy('onlineshoplink').should('exist').click();
    })

    it('TEST 1: Busca, Elimina, Crea, Edita un producto FE + BE', () => {
        cy.then(function () {
            cy.log("API: 1.Ingresar en pushing IT");
            cy.eliminarProducto(this.data.productIn.id);
            cy.crearProducto(this.data.productIn);
            cy.log("API: 2.Buscar el producto");
            cy.getProductById(this.data.productIn.id);
            cy.log("API: 3.Eliminar el producto si existe");
            cy.eliminarProducto(this.data.productIn.id);
            cy.log("API: 4.Crear el producto");
            cy.crearProducto(this.data.productIn);
            cy.getProductById(this.data.productIn.id).as('response');
        });
        cy.then(function () {
            cy.log("API: 5.Editar el producto (nombre, precio e imagen unicamente)");
            const productApi = Cypress._.find(this.response.body.products.docs, { name: this.data.productIn.name })
            cy.log(`ID real del producto 1: ${productApi._id}`);
            cy.editProductById(productApi._id, this.data.productOut);
        })
        cy.log("FE: 2.B. Verificar que los datos del producto corresponden a los enviados en la edicion");
        cy.get('@data').then(function () {
            cy.log("FE: 1.Visitar la pagina");          // En el beforeEach
            cy.log("FE: 2.Dirigirse al online Shop");   // En el beforeEach
            cy.log("FE: 2.A. Buscar el producto por su ID en el search");
            productSearchResultPage.searchProductById(this.data.productIn.id);
            cy.get('.css-rdnx5m').should('have.attr', 'src', this.data.productOut.img);
            cy.getByDataCy('name').should('have.text', this.data.productOut.name);
            cy.getByDataCy('price').should('have.text', this.data.productOut.price);
        });


    })

});