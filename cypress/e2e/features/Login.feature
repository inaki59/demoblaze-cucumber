 @smoke
 Feature:Login test
 @smoke
 Scenario: Validate admin user exists
    Given navigate to login form
    When I log in with username "admin" and password "admin"
    Then I should be logged in successfully

@regression
  Scenario: Validate required fields in login
    Given navigate to login form
    When I try to log in without filling the required fields
    Then we will receive a message "This user already exist."
@regression
  Scenario: Validate non-existent combination
    Given navigate to login form
    When I log in with username "nonexistent" and password "invalidpassword"
    Then we will receive a message "User does not exist."
@regression
  Scenario: Validate log out
    Given navigate to login form
    When I log in with username "admin" and password "admin" after logout
    Then logout successfully