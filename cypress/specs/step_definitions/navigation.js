import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the website", () => {
  cy.visit("/");
});

When("I click on the {string} link", (a) => {
  cy.get('[data-test="nav-home"]').click();
});

Then("I should be redirected to the home page", () => {
  cy.location("pathname").should("equal", "/");
  cy.wait(3000);
});

/* No duplicate steps, this one already above
Given('I am on the website', () => {});*/

/* No duplicate steps, this one already above
When('I click on the {string} link', (a) => {});*/

Then("I should be redirected to the contact page", () => {
  cy.get('[data-test="nav-contact-page"]').click();
  cy.location("pathname").should("equal", "/contact-page");
  cy.wait(3000);
});

/* No duplicate steps, this one already above
Given('I am on the website', () => {});*/

/* No duplicate steps, this one already above
When('I click on the {string} link', (a) => {});*/

Then("I should see the current action displayed", () => {
  cy.get('[data-test="nav-show-auction-page"]').click();
  cy.location("pathname").should("equal", "/show-auction-page");
  cy.wait(3000);
});

/* No duplicate steps, this one already above
Given('I am on the website', () => {});*/

/* No duplicate steps, this one already above
When('I click on the {string} link', (a) => {});*/

Then("I should be redirected to the Login  page", () => {
  cy.get('[data-test="nav-registering-page"]').click();
  cy.location("pathname").should("equal", "/registering-page");
  cy.wait(3000);
});
