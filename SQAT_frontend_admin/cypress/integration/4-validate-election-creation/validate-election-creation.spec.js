/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("add new election", () => {
  beforeEach(() => {
    cy.loginExistingAdmin("admin123@gmail.com", "admin123");
  });

  it("creates new election", () => {
    var electionName;
    // cy.intercept('POST', 'http://localhost:3000/users', {

    cy.intercept("POST", "/elections", (req) => {
      delete req.headers["if-none-match"];
    }).as("addElection");
    cy.get("a[href='/elections']").click();
    // cy.visit("http://localhost:3000/elections");
    cy.get("button[data-cy=add-election-button]").click();
    cy.get("select[name=dept").select(3);
    cy.get("select[name=batch").select(1);
    cy.get("select[name=section").select(3);
    cy.get("button[type=submit]").click();

    cy.fixture("deptTypes").then((val) => {
      electionName =
        val.deptTypes[3 - 1] + " Year-" + 1 + " Section-" + 3 + " election";
    });

    cy.wait("@addElection")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.visit("http://localhost:3000/elections");
        cy.get("table tbody tr").should("contain", electionName);
      });
    // cy.wait(1000).then(() => {
    //   cy.visit("http://localhost:3000/elections");
    //   cy.get("table tbody tr").should("contain", electionName);
    //   // cy.get("a[href='?']").click();
    // });
  });

  it("creates existing election", () => {
    var electionName;
    // cy.intercept('POST', 'http://localhost:3000/users', {

    cy.intercept("POST", "/elections", (req) => {
      delete req.headers["if-none-match"];
    }).as("addElection");
    cy.get("a[href='/elections']").click();
    // cy.visit("http://localhost:3000/elections");
    cy.get("button[data-cy=add-election-button]").click();
    cy.get("select[name=dept").select(3);
    cy.get("select[name=batch").select(1);
    cy.get("select[name=section").select(3);
    cy.get("button[type=submit]").click();

    cy.fixture("deptTypes").then((val) => {
      electionName =
        val.deptTypes[3 - 1] + " Year-" + 1 + " Section-" + 3 + " election";
    });

    cy.wait("@addElection")
      .its("response.statusCode")
      .should("equal", 404)
      .then(() => {
        cy.visit("http://localhost:3000/elections");
        cy.get("table tbody tr").should("contain", electionName);
      });
    // cy.wait(1000).then(() => {
    //   cy.visit("http://localhost:3000/elections");
    //   cy.get("table tbody tr").should("contain", electionName);
    //   // cy.get("a[href='?']").click();
    // });
  });

  it("creates election with missing information", () => {
    // cy.intercept('POST', 'http://localhost:3000/users', {

    
    cy.get("a[href='/elections']").click();
    // cy.visit("http://localhost:3000/elections");
    cy.get("button[data-cy=add-election-button]").click();
    cy.get("button[type=submit]").click();

    cy.get('p[data-cy="dept-error"]').should("be.visible").should("contain", "Select Department from dropdown");
    cy.get('p[data-cy="year-error"]').should("be.visible").should("contain", "Select Year from dropdown"); 
    cy.get('p[data-cy="section-error"]').should("be.visible").should("contain", "Select Section from dropdown");
   
    
    // cy.wait(1000).then(() => {
    //   cy.visit("http://localhost:3000/elections");
    //   cy.get("table tbody tr").should("contain", electionName);
    //   // cy.get("a[href='?']").click();
    // });
  });
});
