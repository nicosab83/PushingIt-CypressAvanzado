

/*
Ingresar en Pushing IT
Dirigirse a Online Shop
Agregar un producto nuevo
Buscar el producto por su ID en el search
Eliminar el producto
Volver a buscar el producto
Verificar que el producto no exista
*/


// Shows commands
///<reference types="Cypress"/>

const directorioName = __dirname.replaceAll('\\','/');

const module = directorioName.split(/[/]/)[2]
const scenarioName = directorioName.slice(directorioName.lastIndexOf('/') + 1).split('-').slice(0,-1).join('-')
const testCaseId = directorioName.split(/[-]/).pop();

describe(`${scenarioName} - ${module} `, () => {

  beforeEach(()=>{
    
    cy.visit("https://pushing-it.vercel.app/")
    cy.get('[data-cy="registertoggle"]').should("exist").dblclick()
    cy.get('[data-cy="user"]').should('be.visible').type("pushingit")
    cy.get('[data-cy="pass"]').should('be.visible').type('123456!')
    cy.get('[data-cy="submitForm"]').should('be.visible').click()    
})

  it('onlie-shop-test', () => {               
      cy.get('.css-lbapbk > :nth-child(5)').should('exist').click()
      cy.get('[data-cy="add-product"]').should('exist').click()      
      cy.get('[data-cy="productName"]').type('pantalon')
      cy.get('[data-cy="productPrice"]').type('2500')
      cy.get('[data-cy="productCard"]').type("https://acdn.mitiendanube.com/stores/001/220/451/products/12-cuotas-sin-interes-y-envio-gratis-a-todo-el-pais-511-2a1a6071a0a7ef253d16292554355786-240-0.png")
      cy.get('[data-cy="productID"]').type('501')
      cy.get('[data-cy="createProduct"]').click()        
      //cy.get('#closeModal').should('be.visible').click()
      //cy.get('.css-lbapbk > :nth-child(5)').should('exist').click()
      cy.get('[data-cy="search-type"]').select('ID')
      cy.get('[data-cy="search-bar"]').type('501{enter}' )
      cy.get('.css-k31g74').contains('pantalon')
      cy.get('[data-cy="delete-501"]').click()
      cy.get('#saveEdit').should('be.visible').click()          
      cy.get('#closeModal').should('be.visible').click()
      //cy.get('.css-lbapbk > :nth-child(5)').should('exist').click()
      cy.get('[data-cy="search-type"]').select('ID')
      cy.get('[data-cy="search-bar"]').type('501{enter}' )
      cy.contains('pantalon').should('not.exist')

    })   
      

});