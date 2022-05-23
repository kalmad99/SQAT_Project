/* eslint-disable testing-library/await-async-utils */
describe("display candidates", () => {
    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
  
    it("displays candidates", () => {
      //   var electionName;
      cy.get("a[href='/candidates']").click();
      cy.get("table tbody tr").should("contain", "Assegid");
      cy.get("table tbody tr").should("have.length.greaterThan",0);
  
  
      // cy.get("table tbody tr").should("contain", electionName);
    });

    it("displays candidates - spied", () => {
        //   var electionName;
        cy.intercept("GET", "/candidates",(req)=>{
            delete req.headers['if-none-match'];
        }).as("getCandidates");
        cy.get("a[href='/candidates']").click();
        cy.wait("@getCandidates").its("response.body.code").should("equal", 200);
        cy.get("table tbody tr").should(
            "contain",
            "Assegid"
          );
          cy.get("table tbody tr").should("have.length.greaterThan", 0);
    
  });
});
  