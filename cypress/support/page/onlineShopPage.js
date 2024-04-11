export class OnlineShopPage {

    constructor() {
        this.url = 'https://pushing-it.vercel.app/home/onlineshop'
        this.addProductBtn = 'add-product';
        this.searchByList = 'search-type';
        this.searchInput = 'search-bar';
        this.productName = 'name';
        this.productPrice = 'price';
        this.productDeleteButton = 'delete-';
        this.productAddToCartButton = 'add-to-cart-';
        this.goShoppingCartButton = 'goShoppingCart';
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

    searchAndAddProductToCart(id, times) {
        this.searchProductById(id);
        cy.log(`se usa el metodo x units`)
        var x;
        for (x = 0; x < times; x++) {
            cy.log(`Producto agregado ${x} veces`)
            this.addProductToCart(id);
        }
    }

    deleteProduct(id) {
        cy.getByDataCy(`${this.productDeleteButton}${id}`).click();
        cy.get('#saveEdit').should('be.visible').click();
        cy.getByDataCy('closeModal').should('be.visible').click();
    }

    goToShoppingCart() {
        cy.getByDataCy(this.goShoppingCartButton).click();
    }

}