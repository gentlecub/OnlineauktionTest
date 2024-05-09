import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I enter {string} into the search box", (a) => {
  cy.get("#search").type("Nissan");
});

Then("I should see only cars with the brand {string} in the results", (a) => {
  cy.get('[data-test="countdown-5"]').should("exist");
});
