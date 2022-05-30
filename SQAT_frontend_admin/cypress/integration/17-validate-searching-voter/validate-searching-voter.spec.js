/* eslint-disable testing-library/await-async-utils */
describe("validate searching through voters", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
  
    it("searches existing voter name", () => {
      cy.get("a[href='/voters']").click();
      cy.get("input[type=text]").type("Mukera");
      cy.get("table tbody tr").should("contain", "Mukera Mukera Mukera");
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
    });
  
    it("searches existing voter name - spied", () => {
      //   var electionName;
      cy.intercept("GET", "/voters?query=Mukera", (req) => {
        delete req.headers["if-none-match"];
      }).as("searchvoter");
      cy.get("a[href='/voters']").click();
      cy.get("input[type=text]").type("Mukera");
      cy.get("svg circle").should("be.visible");
      cy.wait("@searchvoter")
        .its("response.statusCode")
        .should("equal", 200)
        .then(() => {
          cy.get("table tbody tr").should("contain", "Mukera Mukera Mukera");
          cy.get("table tbody tr").should("have.length.greaterThan", 0);
        });
    });
  
    it("searches non existing voter name", () => {
      cy.get("a[href='/voters']").click();
      cy.get("input[type=text]").type("Heyyy");
      cy.get("table").then((table) => {
        if (!table.find("tbody tr").length)
          assert.isOk("No voter to display", "voter does not exist");
      });
    });
  
    it("searches non existing voter name - spied", () => {
      //   var electionName;
      cy.intercept("GET", "/voters?query=Heyyy", (req) => {
        delete req.headers["if-none-match"];
      }).as("searchvoter");
      cy.get("a[href='/voters']").click();
      cy.get("input[type=text]").type("Heyyy");
  
      cy.wait("@searchvoter")
        .its("response.statusCode")
        .should("equal", 204)
        .then(() => {
          cy.get("table").then((table) => {
            if (!table.find("tbody tr").length)
              assert.isOk("No voter to display", "voter does not exist");
          });
        });
    });
  
    it("searches empty query", () => {
      cy.get("a[href='/voters']").click();
      cy.get("input[type=text]").focus().blur();
      cy.get("table tbody tr").should("contain", "Mukera Mukera Mukera");
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
    });
  
    it("searches empty query - spied", () => {
      //   var electionName;
      cy.intercept("GET", "/voters?query=", (req) => {
        delete req.headers["if-none-match"];
      }).as("searchvoter");
      cy.get("a[href='/voters']").click();
      cy.get("input[type=text]").focus().blur();
      cy.wait("@searchvoter")
        .its("response.statusCode")
        .should("equal", 200)
        .then(() => {
          cy.get("table tbody tr").should("contain", "Mukera Mukera Mukera");
          cy.get("table tbody tr").should("have.length.greaterThan", 0);
        });
    });
  });
  