import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I login using my credentials', () => {
  cy.login("Desmond", "234_desmond");
});

Then('I logout', () => {
  cy.logout();
});