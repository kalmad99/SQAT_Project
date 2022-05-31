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

import 'cypress-file-upload';


Cypress.Commands.add('loginExistingAdmin', (existingAdminEmail, existingAdminPassword) => {
    return cy.document().then({ timeout: 560000 }, doc => {

        cy.visit('http://localhost:3000/login', { timeout: 70000 })
        cy.get('input[name=email]', { timeout: 70000 }).type(existingAdminEmail)
        // cy.get('input[name=email]', { timeout: 70000 }).should('have.value', existingUserEmail);
        cy.get('input[name=password]', { timeout: 70000 }, { timeout: 70000 }).type(existingAdminPassword)
        // cy.get('input[name=password]', { timeout: 70000 }).should('have.value', existingUserPassword);
        cy.intercept("POST", "/login/admin", (req) => {
            delete req.headers["if-none-match"];
          }).as("validateAdminLogin");
        cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();
        cy.wait("@validateAdminLogin", { timeout: 70000 });    // And here your code.
        cy.url({ timeout: 70000 }).should('eq', 'http://localhost:3000/')

    });    
});

Cypress.Commands.add('loginIncorrectAdmin', (incorrectemail, incorrectpassword) => {
    return cy.document().then({ timeout: 560000 }, doc => {

        cy.visit('http://localhost:3000/login', { timeout: 70000 })
        cy.get('input[name=email]', { timeout: 70000 }).type(incorrectemail)
        // cy.get('input[name=email]', { timeout: 70000 }).should('have.value', existingUserEmail);
        cy.get('input[name=password]', { timeout: 70000 }, { timeout: 70000 }).type(incorrectpassword)
        // cy.get('input[name=password]', { timeout: 70000 }).should('have.value', existingUserPassword);
        cy.intercept("POST", "/login/admin", (req) => {
            delete req.headers["if-none-match"];
          }).as("validateAdminLogin");
        cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();
        cy.wait("@validateAdminLogin", { timeout: 70000 }).its('response.statusCode').should('eq',404);    // And here your code.
        // cy.url({ timeout: 70000 }).should('eq', 'http://localhost:3000/')

    });
});


Cypress.Commands.add('loginInvalidAdmin', (incorrectemail, incorrectpassword) => {
    return cy.document().then({ timeout: 560000 }, doc => {

        cy.visit('http://localhost:3000/login', { timeout: 70000 })
        cy.get('input[name=email]', { timeout: 70000 }).type(incorrectemail)
        // cy.get('input[name=email]', { timeout: 70000 }).should('have.value', existingUserEmail);
        cy.get('input[name=password]', { timeout: 70000 }, { timeout: 70000 }).type(incorrectpassword)
        // cy.get('input[name=password]', { timeout: 70000 }).should('have.value', existingUserPassword);
        // cy.intercept("POST", "/login/admin", (req) => {
        //     delete req.headers["if-none-match"];
        //   }).as("validateAdminLogin");
        cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();
        cy.get('[data-cy="email-error"]', { timeout: 70000 }).should('be.visible').should("have.text", "Invalid Email Address");
        // cy.wait("@validateAdminLogin", { timeout: 70000 }).its('response.statusCode').should('eq',404);    // And here your code.
        // cy.url({ timeout: 70000 }).should('eq', 'http://localhost:3000/')

    });
});



Cypress.Commands.add('loginEmptyPasswordAdmin', (incorrectemail) => {
    return cy.document().then({ timeout: 560000 }, doc => {

        cy.visit('http://localhost:3000/login', { timeout: 70000 })
        cy.get('input[name=email]', { timeout: 70000 }).type(incorrectemail)
        // cy.get('input[name=email]', { timeout: 70000 }).should('have.value', existingUserEmail);
        // cy.get('input[name=password]', { timeout: 70000 }, { timeout: 70000 }).type(incorrectpassword)
        // cy.get('input[name=password]', { timeout: 70000 }).should('have.value', existingUserPassword);
        // cy.intercept("POST", "/login/admin", (req) => {
        //     delete req.headers["if-none-match"];
        //   }).as("validateAdminLogin");
        cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();
        cy.get('[data-cy="password-error"]', { timeout: 70000 }).should('be.visible').should("have.text", "Password is a Required Field");
        // cy.wait("@validateAdminLogin", { timeout: 70000 }).its('response.statusCode').should('eq',404);    // And here your code.
        // cy.url({ timeout: 70000 }).should('eq', 'http://localhost:3000/')

    });
});

