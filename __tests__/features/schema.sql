CREATE TABLE my_test_table
(
  my_letter  VARCHAR,
  my_string  VARCHAR(500),
  my_number  INT,
  my_boolean BIT,
  my_date    DATETIME,
  my_decimal DECIMAL(12, 2)
);
GO

CREATE PROCEDURE my_procedure
AS
RETURN 1;
GO

CREATE OR ALTER PROCEDURE my_sp(@cant INT, @result DECIMAL(12, 2) OUTPUT)
AS
INSERT INTO my_test_table (my_number, my_decimal)
VALUES (@cant, @result);
SET @result = @cant * @result;
RETURN @@ROWCOUNT;
GO
