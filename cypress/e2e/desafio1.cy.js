// Shows commands
///<reference types="Cypress"/>

import { NewProductPage } from "../support/page/newProductPage";
import { ProductSearchResultPage } from "../support/page/productSearchResultPage";

describe('Cypress Avanzado - Desafío 1', () => {

    const newProductPage = new NewProductPage();
    const productSearchResultPage = new ProductSearchResultPage();
    const fixturePath = 'desafio1data.json';

    before(() => {
        cy.fixture(fixturePath).as('data');
    })

    beforeEach(() => {
        cy.log("Ingresar en Pushing IT");
        cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.visit("");
        cy.log("Dirigirse a Online Shop");
        cy.getByDataCy('onlineshoplink').should('exist').click();
    })

    it('TEST CASE 1: Agregar producto, buscarlo, eliminarlo y verificar que no exista el producto.', () => {
        cy.then(function () {
            cy.eliminarProducto(this.data.product.id);
            cy.log("Agregar un producto nuevo");
            cy.getByDataCy(productSearchResultPage.addProductBtn).should('exist').click();
            newProductPage.newProductFillForm(this.data.product.name, this.data.product.price, this.data.product.img, this.data.product.id);
            cy.log("Buscar el producto por su ID en el search");
            productSearchResultPage.searchProductById(this.data.product.id);
            cy.getByDataCy(productSearchResultPage.productName).contains(this.data.product.name);            
            cy.log("Eliminar el producto");
            productSearchResultPage.deleteProduct(this.data.product.id);
            cy.log("Volver a buscar el producto");
            productSearchResultPage.searchProductById(this.data.product.id);
            cy.log("Verificar que el producto no exista");
            cy.getByDataCy(productSearchResultPage.productName).contains(this.data.product.name).should('not.exist');
        })
    })

});