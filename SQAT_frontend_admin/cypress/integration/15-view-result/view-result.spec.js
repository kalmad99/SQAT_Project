/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable testing-library/await-async-utils */
describe("view election result", () => {
    beforeEach(() => {
      // cy.visit("http://localhost:3000/");
      cy.loginExistingAdmin("admin123@gmail.com", "admin123");
    });

    it("displays election result", () => {
        // cy.intercept("GET", "/elections/1/results", (req) => {
        cy.get("a[href='/elections']").click();
        cy.get("a[data-cy='elections-details']").first().click();
        // cy.wait(2000)
        cy.get("h2[data-cy='result-election-name']").should("contain", "Software Engineering Year-1 Section-1 election");
        cy.get(
          "img[data-cy='result-pp']"
        ).should("be.visible");
        cy.get("h2[data-cy='result-candidate-name']").should("be.visible");
        cy.get("h2[data-cy='result-rank']").should("be.visible");
        cy.get("div[data-cy='result-count']").should("be.visible");
        // cy.get("table tbody tr").should("contain", "Trial Trial Trial");
        // cy.get("table tbody tr").should("have.length.greaterThan", 0);
    
        // cy.get("table tbody tr").should("contain", electionName);
      });
    
  
  });
  