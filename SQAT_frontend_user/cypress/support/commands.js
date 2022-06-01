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
Cypress.Commands.add("loginExistingEmail", (existingAdminEmail) => {
  return cy.document().then({ timeout: 560000 }, (doc) => {
    cy.intercept("POST", "/login/enter", (req) => {
      delete req.headers["if-none-match"];
    }).as("validateLogin");
    cy.visit("http://localhost:3000/login", { timeout: 70000 });
    cy.get("input[name=email]", { timeout: 70000 }).type(existingAdminEmail);

    cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();

    cy.wait("@validateLogin", { timeout: 70000 }).then((xhr) => {
      expect(xhr.response.statusCode).to.eq(200);
      if (xhr.response.statusCode === 200) {
        // cy.log("Login Successful");
        // email = xhr.response.body.email;
        // link = xhr.response.body.magicLink;
        const magic =
          "http://localhost:3000/login/enter/" +
          xhr.response.body.email +
          "/" +
          xhr.response.body.link;

        cy.intercept("POST", `/login/enter`, (req) => {
          delete req.headers["if-none-match"];
        }).as("validateVerification");
        cy.visit(magic);
        cy.wait("@validateVerification", { timeout: 70000 }).then((xhr) => {
          expect(xhr.response.statusCode).to.eq(200);
          if (xhr.response.statusCode === 200) {
              var token = {"token": xhr.response.body.token}
            cy.writeFile("cypress/fixtures/token.json", token);
          }
          //   if (xhr.response.statusCode === 200)
          cy.url({ timeout: 70000 }).should("eq", "http://localhost:3000/");
          // cy.log("Login Successful");
        });
      }
    });
  });
});

Cypress.Commands.add("loginIncorrectEmail", (incorrectemail) => {
  return cy.document().then({ timeout: 560000 }, (doc) => {
    cy.intercept("POST", "/login/enter", (req) => {
      delete req.headers["if-none-match"];
    }).as("validateLogin");
    cy.visit("http://localhost:3000/login", { timeout: 70000 });
    cy.get("input[name=email]", { timeout: 70000 }).type(incorrectemail);

    cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();

    cy.wait("@validateLogin", { timeout: 70000 }).then((xhr) => {
      expect(xhr.response.statusCode).to.eq(400);
      // if (xhr.response.statusCode === 200) {
      // }
    });
  });
});

Cypress.Commands.add("loginInvalidEmail", (incorrectemail) => {
  return cy.document().then({ timeout: 560000 }, (doc) => {
    cy.visit("http://localhost:3000/login", { timeout: 70000 });
    cy.get("input[name=email]", { timeout: 70000 }).type(incorrectemail);
    // cy.get('input[name=email]', { timeout: 70000 }).should('have.value', existingUserEmail);
    //   cy.get(
    //     "input[name=password]",
    //     { timeout: 70000 },
    //     { timeout: 70000 }
    //   ).type(incorrectpassword);
    // cy.get('input[name=password]', { timeout: 70000 }).should('have.value', existingUserPassword);
    // cy.intercept("POST", "/login/admin", (req) => {
    //     delete req.headers["if-none-match"];
    //   }).as("validateAdminLogin");
    cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();
    cy.get('[data-cy="email-error"]', { timeout: 70000 })
      .should("be.visible")
      .should("have.text", "Invalid Email Address");
    // cy.wait("@validateAdminLogin", { timeout: 70000 }).its('response.statusCode').should('eq',404);    // And here your code.
    // cy.url({ timeout: 70000 }).should('eq', 'http://localhost:3000/')
  });
});

Cypress.Commands.add("loginEmptyEmail", () => {
  return cy.document().then({ timeout: 560000 }, (doc) => {
    cy.visit("http://localhost:3000/login", { timeout: 70000 });
    // cy.get("input[name=email]", { timeout: 70000 }).type(incorrectemail);

    cy.get('[data-cy="login-button"]', { timeout: 70000 }).click();
    cy.get('[data-cy="email-error"]', { timeout: 70000 })
      .should("be.visible")
      .should("have.text", "Email is a Required Field");
  });
});

Cypress.Commands.add("logout", () => {
  return cy.document().then({ timeout: 560000 }, (doc) => {
    cy.loginExistingEmail("dannyboy9917@gmail.com");
    cy.get("button[data-cy='logout-button']", { timeout: 70000 }).click();
    cy.url({ timeout: 1000 }).should("eq", "http://localhost:3000/login");
  });
});


Cypress.Commands.add("verifyBeforeVoting", () => {
    return cy.document().then({ timeout: 560000 }, (doc) => {
      cy.intercept("POST", "/verify", (req) => {
        delete req.headers["if-none-match"];
      }).as("verifyBeforeVoting");

      cy.loginExistingEmail("rahelayeled@gmail.com");

    cy.get("[data-cy='voting-button']").click({force:true});
      cy.get("[data-cy='enter-election-button']", { timeout: 70000 }).click({force:true});
  
  
      cy.wait("@verifyBeforeVoting", { timeout: 70000 }).then((xhr) => {
        expect(xhr.response.statusCode).to.eq(200);
        if (xhr.response.statusCode === 200) {
          // cy.log("Login Successful");
          // email = xhr.response.body.email;
          // link = xhr.response.body.magicLink;
          const magic =
            "http://localhost:3000/verify/" +
            xhr.response.body.email +
            "/" +
            xhr.response.body.link;
  
          cy.intercept("POST", `/verify`, (req) => {
            delete req.headers["if-none-match"];
          }).as("validateVerification");
          cy.visit(magic);
          cy.wait("@validateVerification", { timeout: 70000 }).then((xhr) => {
            expect(xhr.response.statusCode).to.eq(200);
            if (xhr.response.statusCode === 200) {
                var token = {"token": xhr.response.body.token}
              cy.writeFile("cypress/fixtures/token.json", token);
            }
            //   if (xhr.response.statusCode === 200)
            cy.url({ timeout: 70000 }).should("eq", "http://localhost:3000/candidate_list");
            // cy.log("Login Successful");
          });
        }
      });
    });
  });
  