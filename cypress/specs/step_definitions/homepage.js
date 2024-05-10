import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I am on the {string} page", (a) => {
  cy.visit("/");
});

When("the page has loaded.", () => {
  cy.waitUntil(() => cy.get("#auctioncard").should("exist"));
});

Then("I should then see the price of the car.", () => {
  cy.getDataTest("countdown-3").should("contain.text", "$20000");
});
