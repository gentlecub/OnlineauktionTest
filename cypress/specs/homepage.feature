Feature: Home Page 
  User visit the site.

  Scenario: Load cars from local database
    Given I am on the "/" page
    When the page loads
    Then I should then see the price of the car.