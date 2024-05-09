Feature: Creating and editing an auction

  Scenario: Website launched and user is not logged in
    Given I am on the homepage and not logged in
    Then the navbar should contain Register Login but not Userpage
    When I click on register in the navbar
    Then the register page should be displayed
    When the register page is displayed
    Then register and login should be visible
    When I enter my login details and click on login
