@slow
Feature: Authentication

  @TC_AUTH_001
  @login
  Scenario: User can login with right username and password
    Given the user is on the login page
    When the user fills the email field with "test@example.com" and the password field with "123456"
    And the user clicks the login button
    Then the user should navigate to the dashboard page

  @TC_AUTH_002
  @login
  Scenario Outline: User cannot submit login form with invalid credentials
    Given the user is on the login page
    When the user fills the email field with "<email>" and the password field with "<password>"
    And the user clicks the login button
    Then the user should stay on the login page

    Examples:
      | email           | password |
      |                 | password |
      | invalidEmail    | password |
      | valid@email.com |          |

  @TC_AUTH_003
  @login
  Scenario: User cannot login with wrong username and password
    Given the user is on the login page
    When the user fills the email field with "wrongemail@example.com" and the password field with "wrongpassword"
    And the user clicks the login button
    Then the user should see invalid credentials error

  @TC_AUTH_004
  @logout
  Scenario: User can logout
    Given the user is logged in
    When the user clicks the user menu button
    And the user clicks the logout button
    Then the user should be redirected to the login page
