/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("idea suggestion", () => {
  beforeEach(() => {
    cy.loginExistingEmail("dannyboy9917@gmail.com");
  });

  it("suggest new idea", () => {
    cy.get("a[href='/auth/ideas']").click();
    var token;
    cy.fixture("token").then((val) => (token = val));
    cy.intercept("POST", "/ideas", (req) => {
      delete req.headers["if-none-match"];
      //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
    }).as("getIdeas");
    cy.get('[data-cy="suggestion-title"]').type("Suggestion 123");
    cy.get('[data-cy="suggestion-desc"]').type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
    );
    cy.get('[data-cy="suggestion-submit"]').click();
    cy.wait("@getIdeas").its("response.statusCode").should("eq", 201);
  });

  it("suggest new idea with missing information", () => {
    cy.get("a[href='/auth/ideas']").click();
    var token;
    cy.fixture("token").then((val) => (token = val));
    cy.intercept("POST", "/ideas", (req) => {
      delete req.headers["if-none-match"];
      //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
    }).as("getIdeas");
    // cy.get('[data-cy="suggestion-title"]').type("Mukera Suggestion");
    // cy.get('[data-cy="suggestion-desc"]').type("Mukera Description");
    cy.get('[data-cy="suggestion-submit"]').click();
    cy.get('[data-cy="suggestion-title-error"]')
      .should("be.visible")
      .should("contain", "Title is required");
    cy.get('[data-cy="suggestion-desc-error"]')
      .should("be.visible")
      .should("contain", "Description is required");

    //   cy.wait("@getIdeas").its("response.statusCode").should("eq",201)
  });

  it("suggest new idea with more than 250 character description", () => {
    cy.get("a[href='/auth/ideas']").click();
    // var token;
    // cy.fixture("token").then((val) => (token = val));
    // cy.intercept("POST", "/ideas", (req) => {
    //   delete req.headers["if-none-match"];
    // //   req.header.Authorization = "Bearer " + token; //the token is a variable which holds the token
    // }).as("getIdeas");
    cy.get('[data-cy="suggestion-title"]').type("Suggestion 123");
    cy.get('[data-cy="suggestion-desc"]').type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
    );
    cy.get('[data-cy="suggestion-submit"]').click();
    cy.get('[data-cy="suggestion-desc-error"]')
      .should("be.visible")
      .should("contain", "Description cant exceed 250 characters");

    //   cy.wait("@getIdeas").its("response.statusCode").should("eq",201)
  });
});
