@slow
Feature: User Sorting

    @TC_USERS_008
    Scenario Outline: The user can sort users by "<field>"
        Given the user is on the users list page
        When the user clicks the "<field>" column header to sort in descending order
        Then the user should see users sorted in descending order by "<locator>"
        When the user clicks the "<field>" column header to sort in ascending order
        Then the user should see users sorted in ascending order by "<locator>"

    Examples:
        | field        | locator  |
        |  email     | email    |
        |  username  | username |
        |  created   | created  |
