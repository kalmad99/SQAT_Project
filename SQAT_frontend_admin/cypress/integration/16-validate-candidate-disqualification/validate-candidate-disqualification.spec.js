/* eslint-disable testing-library/await-async-utils */
describe("validate candidate disqualififcation", () => {
  beforeEach(() => {
    cy.loginExistingAdmin("admin123@gmail.com", "admin123");
  });

  it("re enters disqualified candidate", () => {
    cy.get("a[href='/candidates']").click();

    cy.contains("Trial Trial Trial")
      .parent("tr")
      .get("button[name='disqualify']")
      .click();
    cy.contains("Trial Trial Trial")
      .parent("tr")
      .get("td span[name='status']")
      .then((state) => {
        cy.wrap(state).should("have.text", "active");
      });
  });

  it("disqaulify candidate - spied", () => {
    //   var electionName;
    cy.intercept("PATCH", "/candidates", (req) => {
      delete req.headers["if-none-match"];
    }).as("disqualifyCandidate");

    cy.get("a[href='/candidates']").click();

    cy.contains("Trial Trial Trial")
      .parent("tr")
      .get("button[name='disqualify']")
      .click();

    cy.wait("@disqualifyCandidate")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.contains("Trial Trial Trial")
          .parent("tr")
          .get("td span[name='status']")
          .then((state) => {
            cy.wrap(state).should("have.text", "active");
          });
      });
  });

  });
