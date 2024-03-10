/*** CONSULTA ***/
Cypress.Commands.add('getProductByName', (productName) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?name=${productName}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).then(respuesta => {
        expect(respuesta.status).is.equal(200);
    });
})

Cypress.Commands.add('getProductById', (productId) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?id=${productId}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).then(respuesta => {
        expect(respuesta.status).is.equal(200);
    });
})

/*** ALTA ***/
Cypress.Commands.add('crearProducto', (body) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/create-product`,
        body: body,
    });
});

/*** EDITAR ***/
Cypress.Commands.add('editProductById', (productId, body) => {
    cy.then(function () {
        cy.request({
            url: `${Cypress.env().baseUrlAPI}/product/${productId}`,
            method: "PUT",
            failsOnStatusCode: false,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            },
            body: body,
        }).then(respuesta => {
            cy.log(respuesta);
            expect(respuesta.status).is.equal(202);
        });
    });
})

/*** ELIMINAR ***/
Cypress.Commands.add('eliminarProducto', (id) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?id=${id}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        });
    });

});