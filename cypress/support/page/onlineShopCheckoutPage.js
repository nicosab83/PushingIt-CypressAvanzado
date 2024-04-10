export class OnlineShopCheckoutPage {

    constructor() {
        this.firstNameInput = 'firstName';
        this.lastNameInput = 'lastName';
        this.cardNumberInput = 'cardNumber';
        this.purchaseButton = 'purchase';
        this.sellIdTxt = 'sellId';
        this.thankYouButton = 'thankYou';
    }

    checkoutFillForm(firstName, lastName, cardNumber) {
        cy.getByDataCy(this.firstNameInput).type(firstName);
        cy.getByDataCy(this.lastNameInput).type(lastName);
        cy.getByDataCy(this.cardNumberInput).type(cardNumber);
        cy.getByDataCy(this.purchaseButton).click();
    }

    closePurchaseModal(){
        cy.getByDataCy(this.thankYouButton).click();
    }

    getPurchaseId(){
        return cy.getByDataCy(this.sellIdTxt);
    }

}