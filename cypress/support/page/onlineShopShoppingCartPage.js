export class OnlineShopShoppingCartPage {

    constructor() {
        this.itemsList = '.css-5drwi8';
        this.showTotalPriceButtonText = 'Show total price';
        this.totalPriceId = '#price > b';
        this.goBillingSummaryButton = 'goBillingSummary';
    }

    getItemByPosition(position) {
        return cy.get(this.itemsList).children().eq(position);
    }

    showTotalPrice() {
        cy.contains(this.showTotalPriceButtonText).click();
    }

    getTotalPrice() {
        return cy.get(this.totalPriceId);
    }

    goBillingSummary() {
        cy.getByDataCy(this.goBillingSummaryButton).click();
    }

}
