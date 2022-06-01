/* eslint-disable testing-library/await-async-utils */
/* eslint-disable cypress/no-unnecessary-waiting */
describe("admin logout", () => {
  it("sign out admin", () => {
    cy.logout();
  });
});
