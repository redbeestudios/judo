Feature: judo works

#  This table should exist in the database
#
#  CREATE TABLE my_test_table (
#    my_letter VARCHAR,
#    my_string VARCHAR(500),
#    my_number INT,
#    my_boolean BIT,
#    my_date DATETIME
#  );
#
#  CREATE PROCEDURE my_procedure
#  AS
#    RETURN 1;
#  GO
#
#  CREATE OR ALTER PROCEDURE my_sp (
#    @cant Int,
#    @result Int OUTPUT)
#  AS
#  SET @result = @cant;
#  RETURN @cant;
#  GO

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

  Scenario: read table ordered by columns

    Given a table my_test_table
      | my_letter | my_number |
      | C         | 3         |
      | B         | 2         |
      | D         | 4         |
      | A         | 1         |

    Then my_test_table should have
      | my_letter {asc} | my_number |
      | A               | 1         |
      | B               | 2         |
      | C               | 3         |
      | D               | 4         |

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

  Scenario: variables inside string should be parsed

    Given I save 5 as $number
    And a table my_test_table
      | my_string            |
      | my number is $number |
    Then my_test_table should have
      | my_string            |
      | my number is $number |
    And my_test_table should have
      | my_string      |
      | my number is 5 |

  Scenario: i read one value from the a table

    Given a table my_test_table
      | my_letter | my_number |
      | C         | 123       |

    When I read my_number from table my_test_table when my_letter equals C

    Then variable $my_number should equal 123

  Scenario: i execute a stored procedure and access it's result

    When I execute my_procedure

    Then variable $returned should equal 1


  Scenario: i pass output values to sp

    When I execute my_sp with args:
    """
    cant 1
    result 2 OUTPUT
    """

    Then variable $result should equal 1

  Scenario: i test a sql function

    When I call UPPER('sql') as uppercase

    Then variable uppercase should equal SQL

  Scenario: i test a function

    When I call IIF(1 = 1, 0, 1) as res

    Then variable res should equal 0
