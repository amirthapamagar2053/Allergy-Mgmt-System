/* eslint-disable no-undef */
describe("User can", function () {
  it(" open the app", function () {
    cy.visit("http://localhost:3002/signin");
    cy.contains("Sign in");
  });

  it("signup ", function () {
    cy.visit("http://localhost:3002/signin");
    cy.contains("Don't have an account? Sign Up").click();
    cy.get("#email").type("test@gmail.com");
    cy.get("#password").type("password");
  });
});
