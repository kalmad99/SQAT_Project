/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("voter verification", () => {
    it("verifies voter before voting", () => {
      cy.verifyBeforeVoting();
    });
  
  
  });
  