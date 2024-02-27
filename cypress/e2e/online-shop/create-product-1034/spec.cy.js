const directorioName = __dirname.replaceAll('\\', '/');
const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

    it('Deberia permitir al usuario crear  un producto', () => {
        cy.log('Verificar que exista, si existe eliminarlo');
        cy.log(`Crear un producto numero ${testCaseId}`)
    });
});