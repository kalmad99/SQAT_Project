/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("vote candidate", () => {
  it("vote for candidate", () => {
    cy.verifyBeforeVoting();
    cy.intercept("PATCH", "/elections", (req) => {
      delete req.headers["if-none-match"];
    }).as("vote");
    cy.wait(1000);

    cy.get("[data-cy='vote-button']").first().click();
    cy.wait("@vote").its("response.statusCode").should("eq", 200);
    cy.url({ timeout: 70000 }).should("eq", "http://localhost:3000/auth/Result");
  });
});
