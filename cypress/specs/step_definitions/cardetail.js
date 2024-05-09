import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the {string} homepage", (a) => {
  cy.visit("/");
});

When("I click on a specific car", () => {
  cy.get('[data-test="countdown-3"]').click();
});

Then("I should be redirected to the details page of that car", () => {
  cy.url().should("include", "/cars/3");
});

When("I view the details of the car", () => {
  cy.get("#card-F-150").should("exist");
});

Then("I should then see the name of the car", () => {
  cy.get("#card-titleFord").should("contain.text", "Information of Ford F-150");
});
