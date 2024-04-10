export class OnlineShopShoppingCartPage {

    constructor() {
        this.itemsList = '.css-5drwi8';
        this.showTotalPriceButtonText = 'Show total price';
        this.totalPriceId = '#price > b';
        this.goBillingSummaryButton = 'goBillingSummary';
    }

    getItemByPosition(position) {
        /*
        return cy.get(itemsList).children().eq(position + 1).then((elemento) => {
            // Obtener los datos de la segunda línea de la tabla
            const cantidad = elemento.find('#productAmount').text();
            const producto = elemento.find('#productName').text();
            const precioUnitario = elemento.find('#unitPrice').text();
            const precioTotal = elemento.find('#totalPrice').text();

            // Devolver un objeto con los datos obtenidos
            return {
                cantidad: cantidad,
                producto: producto,
                precioUnitario: precioUnitario,
                precioTotal: precioTotal
            };
        });
        */
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
