/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("idea voting", () => {
  beforeEach(() => {
    cy.loginExistingEmail("mukera123@gmail.com");
  });

  it("vote idea", () => {
    cy.get("a[href='/auth/ideas']").click();
    var token;
    cy.fixture("token").then((val) => (token = val));
    //   cy.intercept("POST", "/ideas", (req) => {
    //     delete req.headers["if-none-match"];
    //     //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
    //   }).as("voteIdea");
    cy.get('[data-cy="idea-like"]').first().click();
    cy.wait(2000);
    //   cy.wait("@voteIdea").its("response.statusCode").should("eq", 201);
    cy.get('[data-cy="idea-like-outlined"]').should("be.visible");
  });

  it("vote prevoted idea", () => {
    cy.get("a[href='/auth/ideas']").click();
    var token;
    cy.fixture("token").then((val) => (token = val));
    //   cy.intercept("POST", "/ideas", (req) => {
    //     delete req.headers["if-none-match"];
    //     //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
    //   }).as("voteIdea");
    cy.get('[data-cy="idea-like"]').first().click();
    cy.wait(2000);
    //   cy.wait("@voteIdea").its("response.statusCode").should("eq", 201);
    cy.get('[data-cy="idea-like-filled"]').should("be.visible");
  });
});
