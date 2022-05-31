/* eslint-disable testing-library/await-async-utils */
describe("display candidates", () => {
  beforeEach(() => {
    cy.loginExistingAdmin("admin123@gmail.com", "admin123");
  });

  it("displays candidates", () => {
    //   var electionName;
    cy.get("a[href='/candidates']").click();
    cy.get("table tbody tr").should("contain", "Trial Trial Trial");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // cy.get("table tbody tr").should("contain", electionName);
  });

  it("displays candidates - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/candidates?query=", (req) => {
      delete req.headers["if-none-match"];
    }).as("getCandidates");
    cy.get("a[href='/candidates']").click();
    cy.wait("@getCandidates")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.get("table tbody tr").should("contain", "Trial Trial Trial");
        cy.get("table tbody tr").should("have.length.greaterThan", 0);
      });
  });
});
