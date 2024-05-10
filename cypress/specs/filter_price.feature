Feature: Filter by price on home page

  Scenario: Filter car by price
    Given I am on the homepage
    When I click on the in the price selector
    Then Shows you a list of car price 
    When When you click on a price 
    Then Shows the cars with the selected price
      