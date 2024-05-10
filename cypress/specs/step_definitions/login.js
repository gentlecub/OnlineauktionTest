import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the login page", (a) => {
  cy.visit("/userpage");
});

When("I enter my username and password", () => {
  cy.get("#username").type("john");
  cy.get("#password").type("123_John");
});

When("I click the login button", () => {
  cy.get("#login").click();
});

Then("I should be redirected to the dashboard", () => {
  cy.url().should("include", "/");
});

export { Given, When, Then };
