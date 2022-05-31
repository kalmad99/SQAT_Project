/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("add new user", () => {
  beforeEach(() => {
    cy.loginExistingAdmin("admin123@gmail.com", "admin123");
  });

  it("adds new voter - spied", () => {
    // cy.intercept('POST', 'http://localhost:3000/users', {

    // cy.visit("http://localhost:3000/voters");
    cy.intercept("POST", "/voters", (req) => {
      delete req.headers["if-none-match"];
    }).as("addVoter");
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Abebe");
    cy.get("input[name=fname]").type("Kebede");
    cy.get("input[name=gname]").type("Beyene");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("abebe123@gmail.com");
    cy.get("button[type=submit]").click();

    cy.wait("@addVoter")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.visit("http://localhost:3000/voters");
        cy.get("table tbody tr").should("contain", "Abebe");
      });

    // cy.wait("@addVoter").then(() => {

    // cy.get("a[href='?']").click();

    // });
  });

  it("add new candidate with existing email", () => {
    // cy.intercept('POST', 'http://localhost:3000/users', {

    // cy.visit("http://localhost:3000/voters");
    cy.intercept("POST", "/candidates", (req) => {
      delete req.headers["if-none-match"];
    }).as("addCandidate");
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();

    cy.get("input[name=name]").type("trial");
    cy.get("input[name=fname]").type("trial");
    cy.get("input[name=gname]").type("trial");
    cy.get("input[name=id]").type("ATR/2312/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(5);
    cy.get("select[name=section").select(2);
    cy.get("input[name=email]").type("abebe123@gmail.com");
    cy.get("input[type=checkbox]").check();
    cy.get("textarea[name=bio]").type("this is my mukera bio");
    cy.get('input[type="file"]').attachFile("yellow_angry_bird.jpg");
    cy.get("button[type=submit]").click();

    cy.wait("@addCandidate").then((result) => {
      cy.wrap(result).its("response.statusCode").should("equal", 404);
      cy.wrap(result)
        .its("response.body")
        .should("equal", "User Already Exists!");
      cy.visit("http://localhost:3000/candidates");
      cy.get("table tbody tr").should("not.contain", "trial");
    });
  });

  it("adds new voter with incorrect name", () => {
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Abebe");
    cy.get("input[name=fname]").type("Kebede23");
    cy.get("input[name=gname]").type("Beyene");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("abebe123@gmail.com");
    cy.get("button[type=submit]").click();

    cy.get("input[name=name]")
      .parent("div")
      .get("p")
      .should("be.visible")
      .should(
        "have.text",
        "Invalid Name (Only Upper/Lower Case alphabets  3-20 characters long)"
      );
  });

  it("adds new voter with incorrect ID", () => {
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Abebe");
    cy.get("input[name=fname]").type("Kebede");
    cy.get("input[name=gname]").type("Beyene");
    cy.get("input[name=id]").type("ATR0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("abebe123@gmail.com");
    cy.get("button[type=submit]").click();

    cy.get("input[name=id]")
      .parent("div")
      .get("p")
      .should("be.visible")
      .should("have.text", "Invalid ID Format (eg. ATR/1234/09)");
  });

  it("adds new voter with incorrect email", () => {
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Abebe");
    cy.get("input[name=fname]").type("Kebede");
    cy.get("input[name=gname]").type("Beyene");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("abebe123");
    cy.get("button[type=submit]").click();

    cy.get("input[name=email]")
      .parent("div")
      .get("p")
      .should("be.visible")
      .should("have.text", "Invalid Email Address");
  });

  it("adds new voter with missing information", () => {
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Abebe");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("abebe123@gmail.com");
    cy.get("button[type=submit]").click();

    cy.get("input[name=fname]")
      .parent("div")
      .get("p")
      .should("be.visible")
      .should(
        "have.text",
        "Father's Name is a Required FieldGrandfather's Name is a Required Field"
      );
  });

  it("adds new candidate - spied", () => {
    // cy.intercept('POST', 'http://localhost:3000/users', {

    // cy.visit("http://localhost:3000/voters");
    cy.intercept("POST", "/candidates", (req) => {
      delete req.headers["if-none-match"];
    }).as("addCandidte");
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Betty");
    cy.get("input[name=fname]").type("Gebeyehu");
    cy.get("input[name=gname]").type("Demelash");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("betty123@gmail.com");
    cy.get("input[type=checkbox]").check();
    cy.get("textarea[name=bio]").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
    );
    cy.get('input[type="file"]').attachFile("yellow_angry_bird.jpg");
    cy.get("button[type=submit]").click();

    cy.wait("@addCandidte")
      .its("response.statusCode")
      .should("equal", 200)
      .then(() => {
        cy.visit("http://localhost:3000/candidates");
        cy.get("table tbody tr").should("contain", "Betty");
      });
  });

  it("adds new candidate with missing bio", () => {
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Betty");
    cy.get("input[name=fname]").type("Gebeyehu");
    cy.get("input[name=gname]").type("Demelash");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("betty123@gmail.com");
    cy.get("input[type=checkbox]").check();
    cy.get('input[type="file"]').attachFile("yellow_angry_bird.jpg");
    cy.get("button[type=submit]").click();

    cy.get("textarea[name=bio]")
      .parent("div")
      .get("p")
      .should("be.visible")
      .should("have.text", "Bio is a Required Field");
  });

  it("adds new candidate with over 250 charactered bio", () => {
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("Betty");
    cy.get("input[name=fname]").type("Gebeyehu");
    cy.get("input[name=gname]").type("Demelash");
    cy.get("input[name=id]").type("ATR/0000/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(1);
    cy.get("select[name=section").select(1);
    cy.get("input[name=email]").type("betty123@gmail.com");
    cy.get("input[type=checkbox]").check();
    cy.get("textarea[name=bio]").type(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt"
    );
    cy.get('input[type="file"]').attachFile("yellow_angry_bird.jpg");
    cy.get("button[type=submit]").click();

    cy.get("textarea[name=bio]")
      .parent("div")
      .get("p")
      .should("be.visible")
      .should("have.text", "Bio Exceeded Maximum characters of 250");
  });
});
