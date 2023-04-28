@MY @travel
Feature: Travel scenarios

  Scenario: Home and Notebooks page
    When I open "shop.by" url
    And I scroll to the "footer" element
    And I wait until "computerSection" is displayed
    And I click on "#1" element from "computerSection > items"
    And I type "700" in "filterSidebar > leftPriceInput"
    And I type "1500" in "filterSidebar > rightPriceInput"
    And I scroll to the top of "filterSidebar > manufacturererShowMoreBtn" element
    And I click on "filterSidebar > manufacturererShowMoreBtn" element
    And I click on "Lenovo" element from "filterSidebar > manufacturererCheckboxes"
    And I wait until "filterSidebar > showResultsBtn" is displayed
    And I click on "filterSidebar > showResultsBtn" element
    And I wait until "filterSidebar > showResultsBtn" is not displayed
    Then All prices of products should be in range from 700 to 1500
    Then All products should contain "Lenovo" in title
