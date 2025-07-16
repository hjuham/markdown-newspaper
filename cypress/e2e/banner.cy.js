describe("can load site", () => {
  before(() => {
    cy.task("clearTestDatabase");
  });
  it("passes", () => {
    //URL cypress.config.js-tiedostossa
    cy.visit("/");
  });
});
