Feature: Filter on home page

  Scenario: Filter car by model oh by price
    Given I am on the homepage
    When I click on the in the model selector
    Then Shows you a list of car model names
    When When you click on a model name
    Then Shows the cars with the selected model
      