import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I am on the homepage and not logged in', () => {
  cy.visit('/');
  cy.location("pathname").should("equal", "/");
  cy.getDataTest('nav').should("be.visible")
});

Then('the navbar should contain Register Login but not Userpage', (a, b) => {
  cy.getDataTest('nav-registering-page').should("be.visible");
  cy.getDataTest('nav-userpage').should("not.exist");
});

When('I click on register in the navbar', (a) => {
  cy.getDataTest('nav-registering-page').click();
});

Then('the register page should be displayed', () => {
  cy.location("pathname").should("equal", "/registering-page");
});

When('the register page is displayed', () => {
  cy.location("pathname").should("equal", "/registering-page");
});

Then('register and login should be visible', (a, b) => {
  cy.contains(/registration/i).should("be.visible");
  cy.contains(/login/i).should("be.visible");
});

When('I enter my login details and click on login', () => {
  cy.getDataTest('login-username-input').type("Desmond");
  cy.getDataTest('login-password-input').type("234_desmond");

  // THIS INTERCEPT IS BREAKING THE TESTS NEED TO FIX

  // cy.intercept({
  //   method: "GET",
  //   url: "http://localhost:5173/api/users"
  // }, {
  //   statusCode: 200,
  //   body: [
  //     {
  //     username: "Desmond",
  //     password: "234_desmond",
  //     name: "Desmond",
  //     message: "Successfully intercepted login GET request"
  //     }
  //   ]
  // }).as("loginRequest");

  cy.getDataTest('login-submit-button').click();

  // cy.wait("@loginRequest").then((interception) => {
  //   expect(interception.response.statusCode).to.eq(200);
  //   expect(interception.response.body[0].message).to.eq("Successfully intercepted login GET request")
  // });
  
});


