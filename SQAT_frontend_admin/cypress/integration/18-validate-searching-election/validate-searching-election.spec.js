/* eslint-disable testing-library/await-async-utils */
describe("validate searching through elections", () => {
    beforeEach(() => {
      // cy.visit("http://localhost:3000/");
      cy.loginExistingAdmin("admin123@gmail.com", "admin123");
    });
  
    it("searches existing election name", () => {
      cy.get("a[href='/elections']").click();
      cy.get("input[type=text]").type("Chemical");
      cy.get("table tbody tr").should("contain", "Chemical Engineering Year-1 Section-3 election");
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
    });
  
    it("searches existing election name - spied", () => {
      //   var electionName;
      cy.intercept("GET", "/elections?query=Chemical", (req) => {
        delete req.headers["if-none-match"];
      }).as("searchelection");
      cy.get("a[href='/elections']").click();
      cy.get("input[type=text]").type("Chemical");
    //   cy.get("svg circle").should("be.visible");
      cy.wait("@searchelection")
        .its("response.statusCode")
        .should("equal", 200)
        .then(() => {
            cy.get("table tbody tr").should("contain", "Chemical Engineering Year-1 Section-3 election");
            cy.get("table tbody tr").should("have.length.greaterThan", 0);
        });
    });
  
    it("searches non existing election name", () => {
      cy.get("a[href='/elections']").click();
      cy.get("input[type=text]").type("XYZ");
      cy.get("table").then((table) => {
        if (!table.find("tbody tr").length)
          assert.isOk("No Election to display", "Election does not exist");
      });
    });
  
    it("searches non existing election name - spied", () => {
      //   var electionName;
      cy.intercept("GET", "/elections?query=XYZ", (req) => {
        delete req.headers["if-none-match"];
      }).as("searchelection");
      cy.get("a[href='/elections']").click();
      cy.get("input[type=text]").type("XYZ");
  
      cy.wait("@searchelection")
        .its("response.statusCode")
        .should("equal", 200)
        .then(() => {
          cy.get("table").then((table) => {
            if (!table.find("tbody tr").length)
              assert.isOk("No election to display", "election does not exist");
          });
        });
    });
  
    it("searches empty query", () => {
      cy.get("a[href='/elections']").click();

      cy.get("input[type=text]").focus().blur();
      cy.get("table tbody tr").should("contain", "Chemical Engineering Year-1 Section-3 election");
      cy.get("table tbody tr").should("have.length.greaterThan", 0);
    });
  
    it("searches empty query - spied", () => {
      //   var electionName;
      cy.intercept("GET", "/elections?query=", (req) => {
        delete req.headers["if-none-match"];
      }).as("searchelection");
      cy.get("a[href='/elections']").click();
      cy.get("input[type=text]").focus().blur();
      cy.wait("@searchelection")
        .its("response.statusCode")
        .should("equal", 200)
        .then(() => {
          cy.get("table tbody tr").should("contain", "Chemical Engineering Year-1 Section-3 election");
          cy.get("table tbody tr").should("have.length.greaterThan", 0);
        });
    });
  });
  