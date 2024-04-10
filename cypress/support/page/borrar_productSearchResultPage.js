export class ProductSearchResultPage {

    constructor() {
        this.addProductBtn = 'add-product';
        this.searchByList = 'search-type';
        this.searchInput = 'search-bar';
        this.productName = 'name';
        this.productPrice = 'price';
        this.productDeleteButton = 'delete-';
        this.productAddToCartButton = 'add-to-cart-';
        this.goShoppingCartButton = 'goShoppingCart';
        //this.goCheckoutButton = 'goCheckout';
        this.goBillingSummaryButton = 'goBillingSummary';
        //this.showTotalPriceButtonText = 'Show total price';
    }

    searchProductById(id) {
        cy.getByDataCy(this.searchByList).select('ID');
        cy.getByDataCy(this.searchInput).clear();
        cy.getByDataCy(this.searchInput).type(`${id}{enter}`);
    }

    addProductToCart(id) {
        cy.getByDataCy(`${this.productAddToCartButton}${id}`).click();
        cy.getByDataCy('closeModal').should('be.visible').click();
    }

    searchAndAddProductToCart(id) {
        this.searchProductById(id);
        this.addProductToCart(id);
    }

    deleteProduct(id) {
        cy.getByDataCy(`${this.productDeleteButton}${id}`).click();
        cy.get('#saveEdit').should('be.visible').click();
        cy.getByDataCy('closeModal').should('be.visible').click();
    }

    searchAndAddProductToCart(id) {
        this.searchProductById(id);
        cy.getByDataCy(`${this.productAddToCartButton}${id}`).click();
        cy.getByDataCy('closeModal').should('be.visible').click();
    }

    goToShoppingCart() {
        cy.getByDataCy(this.goShoppingCartButton).click();
    }

}