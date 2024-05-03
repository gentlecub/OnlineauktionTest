Feature: Navigation Functionality

  Scenario: Website is launched and navbar is tested
    Given I am on the homepage
    When I click on the contact page link
    Then the contact page should be displayed
    When I click on the show auction page link
    Then the show auction page should be displayed

      