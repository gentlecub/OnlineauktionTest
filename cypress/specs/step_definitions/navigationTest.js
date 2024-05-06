import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the homepage and the navbar is visible', () => {
  cy.visit('/');
  cy.location("pathname").should("equal", "/");
  cy.get('[data-test="nav"]').should("be.visible")

});

Then('the navbar should not contain userpage', () => {
  cy.get('[data-test="nav"]').should("not.contain", /userpage/i)
});

When('I click on Contact Us in the navbar', () => {
  cy.get('[data-test="nav-contact-page"]').click();
});

Then('the contact page should be displayed', () => {
  cy.location("pathname").should("equal", "/contact-page");
  cy.contains(/your email/i).should("be.visible")
});

When('I click on Show Current Auction in the navbar', () => {
  cy.get('[data-test="nav-show-auction-page"]').click();
});

Then('the show auction page should be displayed', () => {
  cy.location("pathname").should("equal", "/show-auction-page");
});

When('I click on Register Login in the navbar', () => {
  cy.get('[data-test="nav-registering-page"]').click();
});

Then('the registration page should be displayed', () => {
  cy.location("pathname").should("equal", "/registering-page");
  cy.contains("Registration").should("be.visible");
  cy.contains("Login").should("be.visible");
});

When('I click on Home in the navbar', () => {
  cy.get('[data-test="nav-home"]').click();
});

Then('the homepage should be displayed', () => {
  cy.location("pathname").should("equal", "/");
});