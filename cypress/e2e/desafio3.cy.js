// Shows commands
///<reference types="Cypress"/>

import { CheckoutPage } from "../support/page/checkoutPage";
import { ProductSearchResultPage } from "../support/page/productSearchResultPage";

const fixturePath = 'desafio3data.json';
const productSearchResultPage = new ProductSearchResultPage();
const checkoutPage = new CheckoutPage();

describe('Cypress Avanzado - Desafío 3', () => {

    before(() => {
        cy.fixture(fixturePath).as('data');
        cy.getTimeStringAsCreditCard().as('creditCardStr');
    })

    beforeEach(() => {
        cy.log("Ingresar en Pushing IT");
        cy.log('API: 1.Ingresar en pushing IT');
        cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.visit("");
        cy.getByDataCy('onlineshoplink').should('exist').click();
    })

    it('TEST CASE 1: ', () => {
        cy.log('API: 2.Crear 2 productos (primero verificar si existen y eliminarlos)');
        cy.then(function () {
            cy.getProductById(this.data.product1.id);
            cy.eliminarProducto(this.data.product1.id);
            cy.crearProducto(this.data.product1);
            cy.getProductById(this.data.product2.id);
            cy.eliminarProducto(this.data.product2.id);
            cy.crearProducto(this.data.product2);
        })
        cy.log('FE: 1.Visitar la pagina');          // En el beforeEach
        cy.log('FE: 2.Dirigirse al online Shop');   // En el beforeEach
        cy.log('FE: 3.Agregar ambos productos al carrito de compra con al menos 2 cantidades cada uno');
        cy.then(function () {
            productSearchResultPage.searchAndAddProductToCart(this.data.product1.id);
            productSearchResultPage.addProductToCart(this.data.product1.id);
            productSearchResultPage.addProductToCart(this.data.product1.id);
            productSearchResultPage.searchAndAddProductToCart(this.data.product2.id);
            productSearchResultPage.addProductToCart(this.data.product2.id);
        })
        cy.log('FE: 4.Dirigirse al carrito de compras');
        cy.getByDataCy(productSearchResultPage.goShoppingCartButton).click();
        cy.log('FE: 5.Dirigirse al checkout');
        cy.getByDataCy(productSearchResultPage.goCheckoutButton).click();
        cy.log('FE: 6.Realizar la compra');
        cy.then(function () {
            checkoutPage.checkoutFillForm(this.data.checkout.firstName, this.data.checkout.lastName, this.creditCardStr);
        })
        cy.log('SQL: Verificar la orden de compra que se registro en la basde de datos SQL'); // (Realizar un join para verificar ambas tablas ‘purchaseProduct’ y ‘sells’ / el id que comparten ambas tablas es el de sells)
        cy.then(function () {
            const query = `SELECT * FROM public.sells as s, public."purchaseProducts" p WHERE s.id = p.sell_id AND "cardNumber" = '${this.creditCardStr}';`
            cy.task("connectDB", query).then(result => {
                cy.log('SQL: Validamos producto 1');
                expect(result[0].firstName).to.equal(this.data.checkout.firstName);
                expect(result[0].lastName).to.equal(this.data.checkout.lastName);
                expect(result[0].cardNumber).to.equal(this.creditCardStr);
                expect(result[0].product).to.equal(this.data.product1.name);
                expect(result[0].quantity).to.equal(this.data.product1Quantity);
                cy.log('SQL: Validamos producto 2');
                expect(result[1].firstName).to.equal(this.data.checkout.firstName);
                expect(result[1].lastName).to.equal(this.data.checkout.lastName);
                expect(result[1].cardNumber).to.equal(this.creditCardStr);
                expect(result[1].product).to.equal(this.data.product2.name);
                expect(result[1].quantity).to.equal(this.data.product2Quantity);
                // expect(result[0]).to.be.deep.equal({ firstName: this.data.checkout.firstName, lastName: this.data.checkout.lastName, cardNumber: this.creditCardStr, product: this.data.product1.name , quantity: this.data.product1Quantity });
                // expect(result[1]).to.be.deep.equal({ firstName: this.data.checkout.firstName, lastName: this.data.checkout.lastName, cardNumber: this.creditCardStr, product: this.data.product2.name , quantity: this.data.product2Quantity });
            });
        })
    })

})