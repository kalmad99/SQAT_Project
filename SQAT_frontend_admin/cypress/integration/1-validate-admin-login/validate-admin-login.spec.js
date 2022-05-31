/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("add new election", () => {
  it("sign in with valid email and password", () => {
    cy.loginExistingAdmin("admin123@gmail.com", "admin123");
  });

  it("sign in with incorrect email and password - spied", () => {
    cy.loginIncorrectAdmin("mukera123@gmail.com", "mukera123");
  });

  it("sign in with invalid email and password", () => {
    cy.loginInvalidAdmin("mukera", "mukera");
  });

  it("sign in with empty password", () => {
    cy.loginEmptyPasswordAdmin("mukera123@gmail.com");
  });
});
