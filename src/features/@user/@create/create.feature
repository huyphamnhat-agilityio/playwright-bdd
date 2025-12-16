@slow
Feature: User Creation

  @TC_USERS_001
  Scenario: User can create a user with valid value
    Given the user is on the Users page
    When the user clicks the "New Record" button
    And the user fills the email field with valid data
    And the user fills the password field with valid data
    And the user fills the password confirm field with valid data
    And the user clicks the "Create" button to submit the form
    Then the API should return success for user creation
    And the user should see the created user in the list
    And the UI result should match the API response

  @TC_USERS_002
  Scenario Outline: User cannot submit create user form with <description>
    Given the user is on the Users page
    When the user clicks the "New Record" button
    And the user fills the email field with "<email>" and the password field with "<password>"
    And the user fills the confirm password field with "<passwordConfirm>"
    And the user clicks the "Create" button
    Then the user should still see the Create User form

    Examples:
      | description            | email                     | password | passwordConfirm |
      | empty email            |                           | 12345678 | 12345678        |
      | empty password         | testuseredit2@example.com |          | 12345678        |
      | empty confirm password | testuseredit3@example.com | 12345678 |                 |

  @TC_USERS_003
  Scenario Outline: The user cannot create a user with <description>
    Given the user is on the Users page
    When the user clicks the "New Record" button
    And the user fills the email field with "<email>" and the password field with "<password>"
    And the user fills the confirm password field with "<passwordConfirm>"
    And the user clicks the "Create" button and receives an API error
    Then the user should see an error toast message
    And the user should still see the Create User form
    And the user should see the input error message "<expectedError>"

    Examples:
      | description            | email                 | password | passwordConfirm | expectedError                    |
      | password too short     | wronguser@example.com | 123      | 123             | Must be at least 8 character(s). |
      | passwords do not match | wronguser@example.com | 12345678 | 87654321        | Values don't match.              |
