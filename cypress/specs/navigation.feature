Feature: Navigation links

  Scenario: Navigate to the home page
    Given I am on the website
    When I click on the "Home" link
    Then I should be redirected to the home page

  Scenario: Navigate to the contact page
    Given I am on the website
    When I click on the "Contact Us" link
    Then I should be redirected to the contact page

  Scenario: View current action
    Given I am on the website
    When I click on the "Show Current Action" link
    Then I should see the current action displayed

  Scenario: Log in
    Given I am on the website
    When I click on the "Registre/ Login" link
    Then I should be redirected to the Login  page
