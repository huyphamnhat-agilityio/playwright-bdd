@slow
Feature: User Deletion

  @TC_USERS_007_1
  Scenario: The user can delete a single user
    Given the user is on the delete users page
    When the user selects a user to delete
    And the user clicks the "Delete selected" button
    And the user confirms the deletion
    Then the deleted user should no longer appear in the user list

  @TC_USERS_007_2
  Scenario: The user can delete multiple users
    Given the user is on the delete users page
    When the user selects multiple users to delete
    And the user clicks the "Delete selected" button
    And the user confirms the deletion
    Then the deleted users should no longer appear in the user list
