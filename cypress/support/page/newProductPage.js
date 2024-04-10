export class NewProductPage {
    constructor() {
        this.productNameInput = 'productName';
        this.productPriceInput = 'productPrice';
        this.productCardInput = 'productCard';
        this.productIDInput = 'productID';
        this.createProductButton = 'createProduct';
        this.closeModal = 'closeModal';
    }

    newProductFillForm(name, price, img, id) {
        cy.getByDataCy(this.productNameInput).type(name);
        cy.getByDataCy(this.productPriceInput).type(price);
        cy.getByDataCy(this.productCardInput).type(img);
        cy.getByDataCy(this.productIDInput).type(id);
        cy.getByDataCy(this.createProductButton).click();
        cy.getByDataCy(this.closeModal).should('be.visible').click();
    }
}