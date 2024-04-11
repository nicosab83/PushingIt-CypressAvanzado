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

describe('Cypress Avanzado - Desafío 4', () => {

    before(() => {
        cy.fixture(fixturePath).as('data');
        cy.getTimeStringAsCreditCard().as('creditCardStr');
    })

    beforeEach(() => {
        //cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.loginStore(Cypress.env().usuario, Cypress.env().password);
        cy.visit("/");
        cy.getByDataCy('onlineshoplink').should('exist').click();
    })

    it('TEST CASE 1: Desafío final.', () => {
        cy.then(function () {
            cy.eliminarProducto(this.data.product1.id);
            cy.crearProducto(this.data.product1);
            cy.eliminarProducto(this.data.product2.id);
            cy.crearProducto(this.data.product2);
            onlineShopPage.searchAndAddProductToCartUnits(this.data.product1.id, this.data.product1Quantity);
            onlineShopPage.searchAndAddProductToCartUnits(this.data.product2.id, this.data.product2Quantity);
            onlineShopPage.goToShoppingCart();
            cy.getByDataCy('productAmount').eq(0).should('have.text', this.data.product1Quantity);
            cy.getByDataCy('productName').eq(0).should('have.text', this.data.product1.name);
            cy.getByDataCy('unitPrice').eq(0).should('have.text', `$${this.data.product1.price}`);
            cy.getByDataCy('totalPrice').eq(0).should('have.text', `$${this.data.product1.price * this.data.product1Quantity}`);
            cy.getByDataCy('productAmount').eq(1).should('have.text', this.data.product2Quantity);
            cy.getByDataCy('productName').eq(1).should('have.text', this.data.product2.name);
            cy.getByDataCy('unitPrice').eq(1).should('have.text', `$${this.data.product2.price}`);
            cy.getByDataCy('totalPrice').eq(1).should('have.text', `$${this.data.product2.price * this.data.product2Quantity}`);
            shopingCartPage.showTotalPrice();
            shopingCartPage.getTotalPrice().should('include.text', this.data.totalPrice);
            let totalPriceCalculated = this.data.product1Quantity * this.data.product1.price + this.data.product2Quantity * this.data.product2.price;
            shopingCartPage.getTotalPrice().should('include.text', totalPriceCalculated);
            shopingCartPage.goBillingSummary();
            billingSummaryPage.getBillingSummaryTable().then((tabla) => {
                cy.verifyDataElementIterateDataCy({
                    'subtotalAmount': totalPriceCalculated,
                    "freightAmount": 'Free',
                    'totalPriceAmount': totalPriceCalculated
                }, tabla)
            })
            billingSummaryPage.goCheckout();
            let sellIdtmp;
            checkoutPage.checkoutFillForm(this.data.checkout.firstName, this.data.checkout.lastName, this.creditCardStr);
            checkoutPage.getPurchaseId().invoke('text').then(texto => {
                sellIdtmp = texto;
                cy.wrap(sellIdtmp).as('sellId');
            })
            cy.get('@sellId').then((sellIdValue) => {
                const query = `SELECT 	*
                                FROM 	public."purchaseProducts" as p,
                                        public.sells as s
                                WHERE 	p.sell_id = s.id
                                AND	p.sell_id = ${sellIdValue};`
                cy.task("connectDB", query).then(result => {
                    expect(result[0].firstName).to.equal(this.data.checkout.firstName);
                    expect(result[0].lastName).to.equal(this.data.checkout.lastName);
                    expect(result[0].cardNumber).to.equal(this.creditCardStr);
                    expect(result[0].product).to.equal(this.data.product1.name);
                    expect(result[0].quantity).to.equal(this.data.product1Quantity);
                    expect(result[1].firstName).to.equal(this.data.checkout.firstName);
                    expect(result[1].lastName).to.equal(this.data.checkout.lastName);
                    expect(result[1].cardNumber).to.equal(this.creditCardStr);
                    expect(result[1].product).to.equal(this.data.product2.name);
                    expect(result[1].quantity).to.equal(this.data.product2Quantity);
                });
            });
        })
    })

    after(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
    });

})