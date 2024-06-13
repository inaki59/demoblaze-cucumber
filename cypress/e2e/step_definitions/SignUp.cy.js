import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const HomePage = require('../../pages/HomePage');


Given('navigate to form sign up', () => {
    HomePage.visit();
    HomePage.openSignUp();
      
  });
When('I sign up with a new user',()=>{
    HomePage.createUser();
    HomePage.register();
})
When('I try to sign up without filling the required fields', () => {
    HomePage.registerEmpty();
}); 
When('I sign up with an existing username', () => {
    HomePage.loadUserExisting();
    HomePage.registerExistingUser();
});
Then('we will receive a message {string}',(message)=>{
    HomePage.verifyAlertMessage(message);
})

  

  