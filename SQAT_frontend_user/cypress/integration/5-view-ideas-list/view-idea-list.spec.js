/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("view idea list", () => {
  beforeEach(() => {
    cy.loginExistingEmail("dannyboy9917@gmail.com");
  });

  it("displays idea list", () => {
    cy.get("a[href='/auth/ideas']").click();
    var token;
    cy.fixture("token").then((val) => (token = val));
    cy.intercept("POST", "/ideas", (req) => {
      delete req.headers["if-none-match"];
    //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
    }).as("getIdeas");
    cy.wait(2000);
    cy.get('[data-cy="idea-card"]').first().should("be.visible");
    cy.get('[data-cy="idea-title"]').first().should("be.visible");
    cy.get('[data-cy="idea-desc"]').first().should("be.visible");
    cy.get('[data-cy="idea-like"]').first().should("be.visible");
    cy.get('[data-cy="idea-count"]').first().should("be.visible");

  });
});
