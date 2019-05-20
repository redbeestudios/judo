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
      | A         | 42        | true       | 2019-03-01 00:00:01 |

    Then my_test_table should have
      | my_letter | my_number | my_boolean | my_date             |
      | A         | 42        | true       | 2019-03-01 00:01:00 |

  Scenario: add a row with a single value to a table

    Given a table my_test_table
      | my_letter |
      | A         |

    Then my_test_table should have
      | my_letter |
      | A         |

  Scenario: non added fields stay null and i can use NULL or null for validation

    Given a table my_test_table
      | my_letter |
      | A         |

    Then my_test_table should have
      | my_letter | my_number | my_boolean | my_date |
      | A         | NULL      | null       | null    |

  Scenario: i can insert/validate BIT fields with 0/1 or false/true

    Given a table my_test_table
      | my_boolean |
      | true       |
      | 1          |
      | false      |
      | 0          |

    Then my_test_table should have
      | my_boolean |
      | 1          |
      | true       |
      | 0          |
      | false      |

  Scenario: store the output of the last insert in $

    Given a table my_test_table
      | my_letter |
      | A         |
    Then variable $>1>my_letter should equal A

    Given a table my_test_table
      | my_letter |
      | B         |
    Then variable $>1>my_letter should equal B

  Scenario: store the output of insert in table alias
    Given a table my_test_table $table
      | my_letter |
      | A         |
    Then variable $table>1>my_letter should equal 'A'

  Scenario: store a variable in context

    Given I save world as hello

    Then variable hello should equal world

  Scenario: store a variable in context from a data table

    Given a table my_test_table
      | my_letter  |
      | letter = a |

    Then my_test_table should have
      | my_letter |
      | a         |
    And variable letter should equal a