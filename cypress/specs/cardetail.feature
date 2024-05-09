Feature: Show car details

  Scenario: View details of a specific car
    Given I am on the homepage
    When I click on a specific car
    Then I should be redirected to the details page of that car
    When I view the details of the car
    Then I should then see the name of the car.