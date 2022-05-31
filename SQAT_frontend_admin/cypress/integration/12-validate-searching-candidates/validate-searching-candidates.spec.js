/* eslint-disable testing-library/await-async-utils */
describe("validate searching through candidates", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("searches existing candidate name", () => {
    cy.get("a[href='/candidates']").click();
    cy.get("input[type=text]").type("Trial");
    cy.get("table tbody tr").should("contain", "Trial Trial Trial");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("searches existing candidate name - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/candidates?query=Trial", (req) => {
      delete req.headers["if-none-match"];
    }).as("searchCandidate");
    cy.get("a[href='/candidates']").click();
    cy.get("input[type=text]").type("Trial");
    cy.get("svg circle").should("be.visible");
    cy.wait("@searchCandidate")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.get("table tbody tr").should("contain", "Trial Trial Trial");
        cy.get("table tbody tr").should("have.length.greaterThan", 0);
      });
  });

  it("searches non existing candidate name", () => {
    cy.get("a[href='/candidates']").click();
    cy.get("input[type=text]").type("Heyyy");
    cy.get("table").then((table) => {
      if (!table.find("tbody tr").length)
        assert.isOk("No Candidate to display", "Candidate does not exist");
    });
  });

  it("searches non existing candidate name - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/candidates?query=Heyyy", (req) => {
      delete req.headers["if-none-match"];
    }).as("searchCandidate");
    cy.get("a[href='/candidates']").click();
    cy.get("input[type=text]").type("Heyyy");

    cy.wait("@searchCandidate")
      .its("response.statusCode")
      .should("equal", 204)
      .then(() => {
        cy.get("table").then((table) => {
          if (!table.find("tbody tr").length)
            assert.isOk("No Candidate to display", "Candidate does not exist");
        });
      });
  });

  it("searches empty query", () => {
    cy.get("a[href='/candidates']").click();
    cy.get("input[type=text]").focus().blur();
    cy.get("table tbody tr").should("contain", "Trial Trial Trial");
    cy.get("table tbody tr").should("have.length.greaterThan", 0);
  });

  it("searches empty query - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/candidates?query=", (req) => {
      delete req.headers["if-none-match"];
    }).as("searchCandidate");
    cy.get("a[href='/candidates']").click();
    cy.get("input[type=text]").focus().blur();
    cy.wait("@searchCandidate")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.get("table tbody tr").should("contain", "Trial Trial Trial");
        cy.get("table tbody tr").should("have.length.greaterThan", 0);
      });
  });
});
