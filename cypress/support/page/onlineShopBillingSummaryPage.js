export class OnlineShopBillingSummaryPage {

    constructor() {
        this.summaryTable = '.css-yz81d6';
        this.subtotalAmount = 'subtotalAmount';
        this.freightAmount = 'freightAmount';
        this.totalPriceAmount = 'totalPriceAmount';
        this.goCheckoutButton = 'goCheckout';
    }

    getBillingSummaryTable() {
        return cy.get(this.summaryTable);
    }

    goCheckout() {
        cy.getByDataCy(this.goCheckoutButton).click();
    }

}
