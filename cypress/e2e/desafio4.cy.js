// Shows commands
///<reference types="Cypress"/>

import { OnlineShopCheckoutPage } from "../support/page/onlineShopCheckoutPage";
import { OnlineShopBillingSummaryPage } from "../support/page/onlineShopBillingSummaryPage";
import { OnlineShopPage } from "../support/page/onLineShopPage";
import { OnlineShopShoppingCartPage } from "../support/page/onlineShopShoppingCartPage";

const fixturePath = 'desafio4data.json';
const onlineShopPage = new OnlineShopPage();
const shopingCartPage = new OnlineShopShoppingCartPage();
const billingSummaryPage = new OnlineShopBillingSummaryPage();
const checkoutPage = new OnlineShopCheckoutPage();

describe('Cypress Avanzado - Desafío 3', () => {

    before(() => {
        cy.fixture(fixturePath).as('data');
        cy.getTimeStringAsCreditCard().as('creditCardStr');
    })

    beforeEach(() => {
        cy.log("Ingresar en Pushing IT");
        cy.log('API: 1.Ingresar en pushing IT y guardar la sesion');
        //cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.loginStore(Cypress.env().usuario, Cypress.env().password);
        cy.visit("/");
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
            var x;
            var y;
            onlineShopPage.searchProductById(this.data.product1.id);
            for (x = 0; x < this.data.product1Quantity; x++) {
                onlineShopPage.addProductToCart(this.data.product1.id);
            }
            onlineShopPage.searchProductById(this.data.product2.id);
            for (y = 0; y < this.data.product2Quantity; y++) {
                onlineShopPage.addProductToCart(this.data.product2.id);
            }
        })
        cy.log('FE: 4.Dirigirse al carrito de compras');
        onlineShopPage.goToShoppingCart();
        cy.log('FE: 5.Verificar los productos que hay en el carrito de compra (qty/name/price/totalPrice)');
        cy.then(function () {
            // Mandar logica a Shopping Cart.
            cy.getByDataCy('productAmount').eq(0).should('have.text', this.data.product1Quantity);
            cy.getByDataCy('productName').eq(0).should('have.text', this.data.product1.name);
            cy.getByDataCy('unitPrice').eq(0).should('have.text', `$${this.data.product1.price}`);
            cy.getByDataCy('totalPrice').eq(0).should('have.text', `$${this.data.product1.price * this.data.product1Quantity}`);
            cy.getByDataCy('productAmount').eq(1).should('have.text', this.data.product2Quantity);
            cy.getByDataCy('productName').eq(1).should('have.text', this.data.product2.name);
            cy.getByDataCy('unitPrice').eq(1).should('have.text', `$${this.data.product2.price}`);
            cy.getByDataCy('totalPrice').eq(1).should('have.text', `$${this.data.product2.price * this.data.product2Quantity}`);
        })
        cy.log('FE: 6.Mostrar el total Price y verificarlo');
        shopingCartPage.showTotalPrice();
        cy.then(function () {
            shopingCartPage.getTotalPrice().should('include.text', this.data.totalPrice);
            let totalPriceCalculated = this.data.product1Quantity * this.data.product1.price + this.data.product2Quantity * this.data.product2.price;
            shopingCartPage.getTotalPrice().should('include.text', totalPriceCalculated);
        })
        cy.log('FE: 7.Verificar el billing summary (utilizar custom command)');
        shopingCartPage.goBillingSummary();
        billingSummaryPage.getBillingSummaryTable().then((tabla) => {
            cy.verifyDataElementIterateDataCy({
                'subtotalAmount': '$7000.77',
                "freightAmount": 'Free',
                'totalPriceAmount': '$7000.77'
            }, tabla)
        })
        cy.log('FE: 8.Dirigirse al checkout');
        billingSummaryPage.goCheckout();
        cy.log('FE: 9.Realizar la compra');
        cy.then(function () {
            let sellIdtmp;
            checkoutPage.checkoutFillForm(this.data.checkout.firstName, this.data.checkout.lastName, this.creditCardStr);
            checkoutPage.getPurchaseId().invoke('text').then(texto => {
                sellIdtmp = texto;
                cy.wrap(sellIdtmp).as('sellId');
            })
            cy.get('@sellId').then((sellIdValue) => {
                cy.log('Valor de sellid almacenado en el alias:', sellIdValue);
                cy.log('SQL: 1.Verificar la orden de compra que se registro en la basde de datos SQL'); // (Realizar un join para verificar ambas tablas ‘purchaseProduct’ y ‘sells’ / el id que comparten ambas tablas es el de sells)
                // const query = `SELECT * FROM public.sells as s, public."purchaseProducts" p WHERE s.id = p.sell_id AND "cardNumber" = '${this.creditCardStr}';`
                const query = `SELECT 	*
                                FROM 	public."purchaseProducts" as p,
                                        public.sells as s
                                WHERE 	p.sell_id = s.id
                                AND	p.sell_id = ${sellIdValue};`
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
            });
        })
    })

    it('TEST CASE 2: ', () => {
        cy.log("Este es el caso 2")
        cy.getProductById(20241);
    })

    it('TEST CASE 3: ', () => {
        cy.log("Este es el caso 3")
        cy.getProductById(20241);
    })

    after(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

})