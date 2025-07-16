before(() => {
  cy.task("clearTestDatabase");
});

describe("login tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("login button is visible", () => {
    cy.get('[data-cy="login"]').should("be.visible");
  });
  it("can navigate to login page when login button is clicked", () => {
    cy.get('[data-cy="login"]').should("be.visible");
    cy.get('[data-cy="login"]').click();
    cy.url().should("include", "login");
  });
});
