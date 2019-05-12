Feature: judo works
"""
  This table should exist in the database

  CREATE TABLE my_test_table (
    my_letter VARCHAR,
    my_number INT,
    my_boolean BIT,
    my_date DATETIME
  );
  """

  Background: setup context
    Given my_test_table is empty

  Scenario: add a row to a table

    Given a table my_test_table
      | my_letter | my_number | my_boolean | my_date             |
      | A         | 42        | true       | 2019-03-01 00:00:00 |

    Then my_test_table should have
      | my_letter | my_number | my_boolean | my_date             |
      | A         | 42        | true       | 2019-03-01 00:00:00 |

  Scenario: validate context variable

    Given a table my_test_table
      | my_letter  |
      | letter = a |

    Then variable letter should equal a

  Scenario: i store a variable

    Given I save world as hello

    Then variable hello should equal world