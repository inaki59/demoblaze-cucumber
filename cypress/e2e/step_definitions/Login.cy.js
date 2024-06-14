import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const HomePage = require('../../pages/Homepage');



Given('navigate to login form', () => {
  HomePage.visit();
  HomePage.openLogin();
});


When('I log in with username {string} and password {string}', (username, password) => {
  HomePage.loginUser(username, password);
  HomePage.clickToLogin()
  });

  When('I log in with username {string} and password {string} after logout', (username, password) => {
    HomePage.loginUser(username, password);
    HomePage.clickToLogin()
    HomePage.loginValidator()
   // HomePage.logout()
    });
  When("I try to log in without filling the required fields", () => {
    HomePage.loginIncomplete("pedrito");
    HomePage.clickToLogin()
    });

  Then('I should be logged in successfully', () => {
    HomePage.loginValidator()
  });
  Then(' we will receive a message {string}', (message) => {
    HomePage.verifyAlertMessage(message)
  });
  Then('logout successfully',()=>{
    HomePage.validateLogout()
  })