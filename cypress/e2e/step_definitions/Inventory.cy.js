import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import Invetory from "../../pages/Invetory";
const inventory = require('../../pages/Invetory');
Given('I am on the home page', () => {
  inventory.visit();
  });
  
  When('I select an item {string}', (item) => {
    inventory.selectSamsung(item);
  });
  When('I filter items by category {string}', (category) => {
    inventory.filterByCategory(category);
})
When('I add items to the cart', (dataTable) => {
  dataTable.hashes().forEach(row => {
  Invetory.addItemToCart(row.item);
  });
  inventory.checkPrice();
  inventory.proceedToCheckout();

});
  
  Then('I should be redirected to the description page of {string}', (item) => {
    inventory.espectedProduct(item);
  });
  Then('I should see only items from the {string} category', (category) => {
    inventory.verifyItemsInCategory(category);
});
Then('I should see the order confirmation', () => {
  inventory.cardEmpty()
});