const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

    before(() => {
        cy.login(Cypress.env().usuario, Cypress.env().password);
        cy.visit('');
    });

    it('Deberia permitir al usuario editar un producto', () => {
        cy.fixture(`${module}/${scenarioName}-${testCaseId}/data`).then(data => {
            cy.eliminarProducto(data.product.id);
            cy.crearProducto(data.product);

            cy.get('[data-cy="onlineshoplink"]').click();
            cy.get('[data-cy="search-type"]').select('ID');
            cy.get('[data-cy="search-bar"]').type(`${data.product.id} {enter}`);
            cy.log('edit product');
            
        });
    })
});