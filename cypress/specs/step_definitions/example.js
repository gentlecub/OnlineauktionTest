import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";


Given('that I can see the homepage', () => {
  cy.visit('/')
  cy.location("pathname").should("equal", "/")
});


Given('all the links in the navigation bar works', () => {

  cy.get('[data-test="nav-contact-page"]').click()
  cy.location("pathname").should("equal", "/contact-page")

  cy.get('[data-test="nav-show-auction-page"]').click()
  cy.location("pathname").should("equal", "/show-auction-page")

  cy.get('[data-test="nav-registering-page"]').click()
  cy.location("pathname").should("equal", "/registering-page")

  cy.get('[data-test="nav-home"]').click()
  cy.location("pathname").should("equal", "/")
  
});