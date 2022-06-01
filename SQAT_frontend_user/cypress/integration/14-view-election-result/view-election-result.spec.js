/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("view election result", () => {
    beforeEach(() => {
      cy.loginExistingEmail("dannyboy9917@gmail.com");
    });
  
    it("displays election result", () => {
      cy.get("a[href='/auth/Result']").click();
      // var token;
      // cy.fixture("token").then((val) => (token = val));
      // cy.intercept("GET", "/elections", (req) => {
      //   delete req.headers["if-none-match"];
      // //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
      // }).as("getElections");
      // cy.wait("@getElections").its("response.statusCode").should("eq", 200);
      cy.wait(1000);

    cy.get("[data-cy='election-dropdown']").click();
    cy.get("[data-cy='election-dropdown-item']").first().click();
    cy.get("[data-cy='candidate-avatar']").should("be.visible");
    cy.get("[data-cy='candidate-votecount']").should("be.visible");
    cy.get("[data-cy='candidate-name']").should("be.visible");
    cy.get("[data-cy='candidate-rank']").should("be.visible");


      cy.wait(1000);
      // cy.get('[data-cy="idea-card"]').first().should("be.visible");
      // cy.get('[data-cy="idea-title"]').first().should("be.visible");
      // cy.get('[data-cy="idea-desc"]').first().should("be.visible");
      // cy.get('[data-cy="idea-like"]').first().should("be.visible");
      // cy.get('[data-cy="idea-count"]').first().should("be.visible");
  
    });
  });
  