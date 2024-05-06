Feature: Navigation Functionality

  Scenario: Website is launched and I am not logged in
    Given I am on the homepage and the navbar is visible
    Then the navbar should not contain userpage
    When I click on Contact Us in the navbar
    Then the contact page should be displayed
    When I click on Show Current Auction in the navbar
    Then the show auction page should be displayed
    When I click on Register Login in the navbar
    Then the registration page should be displayed 
    When I click on Home in the navbar
    Then the homepage should be displayed
