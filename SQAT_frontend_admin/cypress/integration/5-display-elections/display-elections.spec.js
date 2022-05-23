/* eslint-disable testing-library/await-async-utils */
/* eslint-disable jest/valid-expect */

describe("display elections", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays elections", () => {
    //   var electionName;
    cy.get("a[href='/elections']").click();
    cy.get("table tbody tr").should(
      "contain",
      "Software EngineeringYear-1 Section-1 election"
    );
    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // cy.get("table tbody tr").should("contain", electionName);
  });

  it("displays elections - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/elections", (req) => {
      delete req.headers["if-none-match"];
    }).as("getElections");
    cy.get("a[href='/elections']").click();
    cy.wait("@getElections").its("response.body.code").should("equal", 200);
    cy.get("table tbody tr").should(
      "contain",
      "Software EngineeringYear-1 Section-1 election"
    );
    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // cy.get("table tbody tr").should("contain", electionName);
  });
});
