describe("add new user", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("add new voter", () => {
    // cy.intercept('POST', 'http://localhost:3000/users', {

      // cy.visit("http://localhost:3000/voters");
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();
    cy.get("input[name=name]").type("qewrt");
    cy.get("input[name=fname]").type("zxcv");
    cy.get("input[name=gname]").type("rytuty");
    cy.get("input[name=id]").type("ATR/4323/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(5);
    cy.get("select[name=section").select(2);
    cy.get("input[name=email]").type("vxbxasdf@gmail.com");
    cy.get("button[type=submit]").click();

    cy.wait(1000).then(() => {
      cy.visit("http://localhost:3000/voters");
      cy.get("table tbody tr").should("contain", "qewrt");
    // cy.get("a[href='?']").click();

    });
  });



  it("add new candidate", () => {
    // cy.intercept('POST', 'http://localhost:3000/users', {

    // cy.visit("http://localhost:3000/voters");
    cy.get("a[href='/voters']").click();

    cy.get("button[name=add-user]").click();

    cy.get("input[name=name]").type("trial");
    cy.get("input[name=fname]").type("trial");
    cy.get("input[name=gname]").type("trial");
    cy.get("input[name=id]").type("ATR/2312/10");
    cy.get("select[name=dept").select(1);
    cy.get("select[name=year").select(5);
    cy.get("select[name=section").select(2);
    cy.get("input[name=email]").type("trialtrial@gmail.com");
    cy.get("input[type=checkbox]").check();
    cy.get("textarea[name=bio]").type("this is my mukera bio");
    cy.get('input[type="file"]').attachFile("yellow_angry_bird.jpg");
    cy.get("button[type=submit]").click();

    cy.wait(2000).then(() => {
      cy.visit("http://localhost:3000/candidates");
      cy.get("table tbody tr").should("contain", "trial");
    // cy.get("a[href='?']").click();

    });
  });
});
