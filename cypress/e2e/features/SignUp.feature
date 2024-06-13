@smoke @regression
Feature: sign up

  @smoke @regression
  Scenario: create user
    Given navigate to form sign up
    When I sign up with a new user
    Then we will receive a message "Sign up successful."

  @regression
  Scenario: validate required fields
    Given navigate to form sign up
    When I try to sign up without filling the required fields
    Then we will receive a message "Please fill out Username and Password."

  @regression
  Scenario: validate existing username
    Given navigate to form sign up
    When I sign up with an existing username
    Then we will receive a message "This user already exist."
