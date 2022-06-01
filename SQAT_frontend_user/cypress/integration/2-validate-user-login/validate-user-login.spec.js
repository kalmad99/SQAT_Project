/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("user login", () => {
    it("sign in with valid email", () => {
      cy.loginExistingEmail("dannyboy9917@gmail.com");
    });
  
    it("sign in with incorrect email - spied", () => {
      cy.loginIncorrectEmail("abomsa2343@gmail.com");
    });
  
    it("sign in with invalid email", () => {
      cy.loginInvalidEmail("mukera");
    });
  
    it("sign in with empty email", () => {
      cy.loginEmptyEmail();
    });
  });
  