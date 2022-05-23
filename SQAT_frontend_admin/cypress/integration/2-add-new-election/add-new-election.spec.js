describe("add new election", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("add new election", () => {
    var electionName;
    // cy.intercept('POST', 'http://localhost:3000/users', {
    cy.get("a[href='/elections']").click();
    // cy.visit("http://localhost:3000/elections");
    cy.get("button[name=add-election]").click();
    cy.get("select[name=dept").select(3);
    cy.get("select[name=batch").select(1);
    cy.get("select[name=section").select(3);
    cy.get("button[type=submit]").click();

    cy.fixture("deptTypes").then((val) => {
      electionName =
        val.deptTypes[3 - 1] + "Year-" + 1 + " Section-" + 3 + " election";
    });
    cy.wait(1000).then(() => {
      cy.visit("http://localhost:3000/elections");
      cy.get("table tbody tr").should("contain", electionName);
    // cy.get("a[href='?']").click();

    });
  });
});
