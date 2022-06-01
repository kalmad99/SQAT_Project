/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("view candidate detail", () => {
    it("displays candidate detail", () => {
      cy.verifyBeforeVoting();
    //   cy.intercept("PATCH", "/elections", (req) => {
    //     delete req.headers["if-none-match"];
    //   }).as("vote");
      cy.wait(1000);
      cy.get("[data-cy='view-candidate-button']").first().click({
        force: true,
      });

      cy.get("[data-cy='candidate-fullname']", { timeout: 70000 }).should("be.visible");
        cy.get("[data-cy='candidate-bio']", { timeout: 70000 }).should("be.visible");
        cy.get("[data-cy='candidate-avatar']", { timeout: 70000 }).should("be.visible");
        cy.get("[data-cy='candidate-sect']", { timeout: 70000 }).should("be.visible");
        cy.get("[data-cy='candidate-year']", { timeout: 70000 }).should("be.visible");
        cy.get("[data-cy='candidate-dept']", { timeout: 70000 }).should("be.visible");


    //   cy.wait("@vote").its("response.statusCode").should("eq", 200);
    //   cy.url({ timeout: 70000 }).should("eq", "http://localhost:3000/auth/Result");
    });
  });
  