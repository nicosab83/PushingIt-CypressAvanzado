// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import './requests/product'

Cypress.Commands.add('login', (usuario, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/login`,
        body: {
            username: usuario,
            password: password
        },
    }).then(respuesta => {
        window.localStorage.setItem('token', respuesta.body.token);
        window.localStorage.setItem('user', respuesta.body.user.username);
        window.localStorage.setItem('userId', respuesta.body.user._id);
        Cypress.env().token = respuesta.body.token;
    });
});

Cypress.Commands.add('getByDataCy', (selector) => {
    return cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add('getFixturePath', (filePathStr) => {
    return filePathStr.replace(/\.[^.]+$/, "").replace(/\.[^.]+$/, "data");
})

Cypress.Commands.add('getTimeStringAsCreditCard', () => {
        let fecha = new Date();
        let anio = fecha.getFullYear();
        let mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
        let dia = ('0' + fecha.getDate()).slice(-2);
        let horas = ('0' + fecha.getHours()).slice(-2);
        let minutos = ('0' + fecha.getMinutes()).slice(-2);
        let segundos = ('0' + fecha.getSeconds()).slice(-2);
        return `${anio}${mes}${dia}${horas}${minutos}${segundos}00`
})


