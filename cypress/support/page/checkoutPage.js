export class CheckoutPage {

    constructor() {
        this.firstNameInput = 'firstName';
        this.lastNameInput = 'lastName';
        this.cardNumberInput = 'cardNumber';
        this.purchaseButton = 'purchase';
        this.thankYouButton = 'thankYou';
    }

    checkoutFillForm(firstName, lastName, cardNumber){
        cy.getByDataCy(this.firstNameInput).type(firstName);
        cy.getByDataCy(this.lastNameInput).type(lastName);
        cy.getByDataCy(this.cardNumberInput).type(cardNumber);
        cy.getByDataCy(this.purchaseButton).click();
        cy.getByDataCy(this.thankYouButton).click();
    }

}