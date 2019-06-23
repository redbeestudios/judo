Feature: generate monthly summary of expenses

  Background: setup tables
    Given transactions is empty
    And summary is empty

  Scenario: calculate monthly summary for one user with one expense

    Given a table transactions
      | userId | amount | concept  | createdAt  |
      | 1      | 100    | clothing | 2019-06-10 |

    When I execute monthly_expenses

    Then summary should have
      | userId | month | total |
      | 1      | 6     | 100   |


  Scenario: calculate monthly summary for one user with several expenses

    Given a table transactions
      | userId | amount | concept   | createdAt  |
      | 1      | 100    | food      | 2019-06-10 |
      | 1      | 50     | clothing  | 2019-06-10 |
      | 1      | 10     | food      | 2019-06-10 |
      | 1      | 200    | transport | 2019-06-10 |
      | 1      | 50     | food      | 2019-06-10 |

    When I execute monthly_expenses

    Then summary should have
      | userId | month | total |
      | 1      | 6     | 410   |


  Scenario: calculate monthly summary for several users with several expenses in different months

    Given a table transactions
      | userId | amount | concept  | createdAt  |
      | 1      | 100    | clothing | 2019-06-10 |
      | 1      | 50     | clothing | 2019-07-10 |
      | 2      | 100.23 | clothing | 2019-06-10 |
      | 3      | 200    | clothing | 2019-01-10 |
      | 4      | 1000   | food     | 2019-06-10 |
      | 4      | 190    | drinks   | 2019-06-10 |
      | 4      | 10     | clothing | 2019-08-10 |

    When I execute monthly_expenses

    Then summary should have
      | userId {ASC} | month {ASC} | total  |
      | 1            | 6           | 100    |
      | 1            | 7           | 50     |
      | 2            | 6           | 100.23 |
      | 3            | 1           | 200    |
      | 4            | 6           | 1190   |
      | 4            | 8           | 10     |