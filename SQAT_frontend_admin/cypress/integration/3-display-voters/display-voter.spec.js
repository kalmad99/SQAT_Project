/* eslint-disable testing-library/await-async-utils */
describe("display voters", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("displays voters", () => {
    //   var electionName;
    cy.get("a[href='/voters']").click();
    cy.get("table tbody tr").should("contain", "Amanuel");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
    // cy.get("table tbody tr").should("contain", "Amanuel").find("a").click();

    // cy.get("table tbody tr").should("contain", electionName);
  });

  it("displays voters - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/voters", (req) => {
      delete req.headers["if-none-match"];
    }).as("getVoters");
    cy.get("a[href='/voters']").click();
    cy.wait("@getVoters").its("response.body.code").should("equal", 200);
    cy.get("table tbody tr").should("contain", "Amanuel");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });
});
