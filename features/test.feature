Feature: judo works
"""
  This table should exist in the database

  CREATE TABLE my_test_table (
    my_letter VARCHAR,
    my_number INT,
    my_boolean BIT
  );
  """

  Background: setup context
    Given my_test_table is empty

  Scenario: add a row to a table

    Given a table my_test_table
      | my_letter | my_number | my_boolean |
      | A         | 42        | true       |

    Then my_test_table should have
      | my_letter | my_number | my_boolean |
      | A         | 42        | true       |