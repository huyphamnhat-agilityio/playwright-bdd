@slow
Feature: User Edition


    @TC_USERS_004
    Scenario: The user can edit a user with valid value
    Background:
        Given a test user exists for editing
            And the user is on the users page
        When the user clicks the created user for editing
        Then the edit form should be displayed
        When the user updates the email to "<newEmail>"
            And the user enables password editing
            And the user updates the password to "<newPassword>"
            And the user updates the password confirm to "<newPasswordConfirm>"
            And the user clicks the "Save changes" button and receives a valid API response
        Then the user should see the updated user in the list
            And the updated UI result should match the API response

    Examples:
        | newEmail                    | newPassword | newPasswordConfirm |
        | testusereditnew@example.com | 12345678    | 12345678           |


    @TC_USERS_005
    Scenario Outline: The user cannot submit the edit user form with <description>

    Background:
        Given a test user exists for editing invalid cases
            And the user is on the users page
        When the user clicks the created user for editing
        Then the edit form should be displayed

        When the user updates the email to "<newEmail>"
            And the user enables password editing
            And the user updates the password to "<newPassword>"
            And the user updates the password confirm to "<newPasswordConfirm>"
            And the user clicks the "Save changes" button with invalid data

        Then the form should not be submitted

    Examples:
        | description            | newEmail                  | newPassword | newPasswordConfirm |
        | empty email            |                           | 12345678    | 12345678           |
        | empty password         | testuseredit2@example.com |             | 12345678           |
        | empty confirm password | testuseredit3@example.com | 12345678    |                    |