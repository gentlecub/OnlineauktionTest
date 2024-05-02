import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('that I can see the homepage', () => {
  cy.visit('/')
});