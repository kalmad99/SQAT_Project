/* eslint-disable testing-library/await-async-utils */
describe("display candidates detail", () => {
  beforeEach(() => {
    cy.loginExistingAdmin("admin123@gmail.com", "admin123");
  });

  it("displays candidate details", () => {
    cy.get("a[href='/candidates']").click();
    cy.get("table tbody tr td span a[href='/candidateDetail']").click();
    cy.get("h2").should("contain", "Trial Trial Trial");
    cy.get("input[name=dept]").should("have.value", "Software Engineering");
    cy.get("input[name=batch]").should("have.value", "1");
    cy.get("input[name=sect]").should("have.value", "1");
    cy.get("p[data-cy = 'bip-p]").should("contain", "trial is my middle name");
    cy.get(
      "img[src='https://randomuser.me/api/portraits/women/81.jpg']"
    ).should("be.visible");
    // cy.get("table tbody tr").should("contain", "Trial Trial Trial");
    // cy.get("table tbody tr").should("have.length.greaterThan", 0);

    // cy.get("table tbody tr").should("contain", electionName);
  });

  it("displays candidates details - spied", () => {
    //   var electionName;
    cy.intercept("GET", "/candidates/6293ee21a71f25d9044c7515", (req) => {
      delete req.headers["if-none-match"];
    }).as("getCandidateDetail");

    cy.get("a[href='/candidates']").click();
    cy.get("table tbody tr td span a[href='/candidateDetail']").click();
    cy.wait("@getCandidateDetail")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.get("h2").should("contain", "Trial Trial Trial");
        cy.get("input[name=dept]").should("have.value", "Software Engineering");
        cy.get("input[name=batch]").should("have.value", "1");
        cy.get("input[name=sect]").should("have.value", "1");
        cy.get(
          "div[class='text-l text-center w-[50vw] font-regular text-gray-900'] p"
        ).should("contain", "trial is my middle name");
        cy.get(
          "img[src='https://randomuser.me/api/portraits/women/81.jpg']"
        ).should("be.visible");
      });
  });
});
