@smoke @regression
Feature: Item Filtering and Redirection

  @smoke @regression
  Scenario: Validate item redirection to description page
    Given I am on the home page
    When I select an item "Samsung galaxy s6"
    Then I should be redirected to the description page of "Samsung galaxy s6"

    @smoke @regression
  Scenario: Validate filtering by categories
    Given I am on the home page
    When I filter items by category "Laptops"
     
    Then I should see only items from the "Laptops" category
    @smoke @regression
  Scenario: Validate user can complete the purchase process of two or more items
    Given I am on the home page
    When I add items to the cart
     | item                |
      | Samsung galaxy s6   |
      | Sony vaio i7        |
    Then I should see the order confirmation
