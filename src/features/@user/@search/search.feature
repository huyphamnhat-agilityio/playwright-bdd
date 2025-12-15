@slow
Feature: User Search

    @TC_USERS_009
    Scenario Outline: The user can search users by "<searchType>"
        Given the user is on the users search page
        When the user enters "<keyword>" into the search input
            And the user clicks the search button
        Then the user should see search results matching "<keyword>" in the "<column>" column

    Examples:
        | searchType | keyword                   | column   |
        | email      | searchbyemail@example.com | email    |
        | username   | usersearchbyname          | username |
