/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("user logout", () => {
    it("sign out user", () => {
      cy.logout();
    });
  });
  